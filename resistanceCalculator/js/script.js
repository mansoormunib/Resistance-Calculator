class IOhmValueCalculator {
  constructor() {
    this.colorCode = ["#000000", "#A52A2A", "#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#EE82EE", "#808080", "#FFFFFF", "#C17E00", "#C0C0C0", "#FFCC66"];
    this.toleranceArray = ["+/-5%", "+/-10%", "+/-20%"];
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
    $('#path3441').css({
      fill: this.colorCode[multiplier]
    });
    $('#path3443').css({
      fill: this.colorCode[parseInt(tolerance) + 10]
    });
  }
}

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
