const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('react-scripts/config/paths');
const packageJson = require('./package.json');
const version = packageJson.version;
const moduleName = packageJson.name;
const buildFileName = `${moduleName}-${version}`;
const libraryName = "BaseReactJs";

/**
 * Utility function to replace plugins in the webpack config files used by react-scripts
 */
const replacePlugin = (plugins, nameMatcher, newPlugin) => {
    const pluginIndex = plugins.findIndex((plugin) => {
        return (
            plugin.constructor &&
            plugin.constructor.name &&
            nameMatcher(plugin.constructor.name)
        );
    });

    if (pluginIndex === -1) return plugins;

    return plugins
        .slice(0, pluginIndex)
        .concat(newPlugin)
        .concat(plugins.slice(pluginIndex + 1));
};

module.exports = {
    webpack: function (config, env) {
        const isEnvProduction = env === 'production';
        config.output.libraryTarget = 'umd';
        config.output.library = libraryName;
        
        if (isEnvProduction) {
            // Entry Naming: buildFileName instead of main by CRA default build file name
            // https://webpack.js.org/configuration/entry-context/#naming
            config.entry = { [buildFileName]: './src/index.js' };

            // Disable optimization runtimeChunk
            config.optimization.runtimeChunk = false;
            // Disable optimization splitChunks
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                },
            };

            // Multiple entries rewire error: Cannot read property 'filter' of undefined
            // https://github.com/timarney/react-app-rewired/issues/421
            const multiEntryManfiestPlugin = new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicUrlOrPath,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);
                    const entrypointFiles = {};
                    Object.keys(entrypoints).forEach((entrypoint) => {
                        entrypointFiles[entrypoint] = entrypoints[
                            entrypoint
                        ].filter((fileName) => !fileName.endsWith('.map'));
                    });

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            });

            // replace CRA ManifestPlugin with multiEntryManfiestPlugin
            config.plugins = replacePlugin(
                config.plugins,
                (name) => /ManifestPlugin/i.test(name),
                multiEntryManfiestPlugin
            );

            // Override JS output filename and chunkFilename
            config.output.filename = `js/[name].js`;
            config.output.chunkFilename = `js/[name].chunk.js`;

            // Override CSS output filename and chunkFilename
            config.plugins.forEach((plugin, i) => {
                if (
                    plugin.options &&
                    plugin.options.filename &&
                    plugin.options.filename.includes('/css')
                ) {
                    config.plugins[i].options = {
                        ...config.plugins[i].options,
                        filename: `css/[name].css`,
                        chunkFilename: `css/[name].chunk.css`,
                    };
                }
            });

            // Override output path of media folder
            config.module.rules[1].oneOf.forEach((rule, i) => {
                if (
                    rule.options &&
                    rule.options.name &&
                    rule.options.name.includes('/media')
                ) {
                    config.module.rules[1].oneOf[i].options = {
                        ...config.module.rules[1].oneOf[i].options,
                        name: `media/[name].[hash:8].[ext]`,
                    };
                }
            });
        }

        return config;
    },
};