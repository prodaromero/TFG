
function Room() {
  this.long = 0;
  this.wide = 0;
  this.high = 0;

  this.volume = function(){return this.long*this.wide*this.high;}

  // Room surfaces
  this.surface_roof  = 0;
  this.surface_floor = 0;
  this.surface_wall  = 0;


  // Room walls coefficients
  this.coef_abs_wall  = 0;
  this.coef_abs_roof  = 0;
  this.coef_abs_floor = 0;


  // Room walls coefficients in octaves
  this.coef_abs_wall_125   = 0;
  this.coef_abs_wall_250   = 0;
  this.coef_abs_wall_500   = 0;
  this.coef_abs_wall_1000  = 0;
  this.coef_abs_wall_2000  = 0;
  this.coef_abs_wall_4000  = 0;
  this.coef_abs_roof_125   = 0;
  this.coef_abs_roof_250   = 0;
  this.coef_abs_roof_500   = 0;
  this.coef_abs_roof_1000  = 0;
  this.coef_abs_roof_2000  = 0;
  this.coef_abs_roof_4000  = 0;
  this.coef_abs_floor_125  = 0;
  this.coef_abs_floor_250  = 0;
  this.coef_abs_floor_500  = 0;
  this.coef_abs_floor_1000 = 0;
  this.coef_abs_floor_2000 = 0;
  this.coef_abs_floor_4000 = 0;
}
