module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/sw.js",
      swDest: "service-worker.js",
      importWorkboxFrom: "local"
    }
  }
};
