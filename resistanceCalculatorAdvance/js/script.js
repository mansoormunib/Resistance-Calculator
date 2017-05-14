class IOhmValueCalculator {
  constructor() {
    this.colorCode = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    this.colorCode2 = ["gold", "silver", ""];
    this.toleranceArray = ["+/-5%", "+/-10%", "+/-20%"];
    this.selectColor();
  }
  toleranceValue(t) {
    //if bandDColor does not exist in array send default maximum tolerance value
    if (typeof this.toleranceArray[t] === 'undefined') {
      t = 2;
    }
    return this.toleranceArray[t];
  }
  CalculateOhmValue(significant1, significant2, multiplier, tolerance) {
    if (significant1 > 9 || significant2 > 9)
      return "Significant Color must be less than 10";
    var ohmage = 0;
    if (significant1 > 0) {
      ohmage = significant1 + significant2;
      ohmage = eval(ohmage + "e" + multiplier);
    }
    this.updateColor(significant1, significant2, multiplier, tolerance);
    return this.format(ohmage) + ", " + this.toleranceValue(tolerance);
  }
  format(ohmage) {
    if (ohmage >= 1e6) {
      ohmage /= 1e6;
      return ohmage + " Mohms";
    } else {
      if (ohmage >= 1e3) {
        ohmage /= 1e3;
        return ohmage + " Kohms";
      } else {
        return ohmage + " ohms";
      }
    }
  }
  updateColor(significant1, significant2, multiplier, tolerance) {
    $('#path3455').css({
      fill: this.colorCode[significant1]
    });
    $('#path3445').css({
      fill: this.colorCode[significant2]
    });
    if (multiplier < 0)
      multiplier = parseInt(multiplier * -1) + 9;
    $('#path3441').css({
      fill: this.colorCode[multiplier]
    });
    $('#path3443').css({
      fill: this.colorCode2[tolerance]
    });
  }//endi update color

  selectColor() {
      var thisColorCode = this.colorCode;
      var thisColorCode2 = this.colorCode2;
      this.addspectrum("#path3455", "Significant1", thisColorCode);
      this.addspectrum("#path3445", "Significant2", thisColorCode);
      this.addspectrum("#path3441", "Multiplier", thisColorCode);
      this.addspectrum("#path3443", "tolerance", thisColorCode2);
    } //end selectColor

  addspectrum(id, colorBar, colorCode) {
      var thisUpdateColorFunction = this.updateColor();
      $(id).spectrum({
        showPaletteOnly: true,
        change: function(color) {
          var selectedIndex = $.inArray(color.toName(), colorCode);
          if (selectedIndex > -1) {
            $('#' + colorBar).val(selectedIndex).prop('selected', true).trigger('change');
          }
          thisUpdateColorFunction;
        },
        hideAfterPaletteSelect: true,
        palette: [colorCode]
      });
    } //add spectrum

} //end class

$(document).ready(function() {
  calculator = new IOhmValueCalculator();

  $("#Significant1, #Significant2, #Multiplier, #tolerance").on('change', function() {
    var significant1 = $("#Significant1 option:selected").val();
    var significant2 = $("#Significant2 option:selected").val();
    var multiplier = $("#Multiplier option:selected").val();
    var tolerance = $("#tolerance option:selected").val();
    var output = calculator.CalculateOhmValue(significant1, significant2, multiplier, tolerance);
    $("#output").html(output);
  });

});
