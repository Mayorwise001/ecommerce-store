module.exports = {
  // existing config...
  module: {
    rules: [
      // your existing rules...

      // 🔽 Add this rule to ignore missing source maps
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /Failed to parse source map/,
    },
  ],
};
