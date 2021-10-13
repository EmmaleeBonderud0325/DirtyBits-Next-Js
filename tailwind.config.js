module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.js', './styles/**/*.css', './components/**/*.js'],
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
    darkMode: 'class',
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