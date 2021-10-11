module.exports = {
    purge: ['./pages/**/*.js', './styles/**/*.css'],
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
    theme: {
      extend: {
        colors: {
          'custom-yellow':'#FB7A16',
          'custom-yellow2': '#FF6663',
          'custom-maroon' : '#410B3B'
        }
      },
    },  
  };