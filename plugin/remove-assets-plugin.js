class RemoveAssetsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('RemoveAssetsPlugin', function (compilation, callback) {
      const stats = compilation.getStats().toJson();
      stats.assets.forEach((asset) => {
        if (!asset.name.match(/\.js$/)) {
          delete compilation.assets[asset.name];
        }
      });

      callback();
    });
  }
}

module.exports = RemoveAssetsPlugin;
