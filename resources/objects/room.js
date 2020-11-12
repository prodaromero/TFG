
function Room() {
  this.long = 0;
  this.wide = 0;
  this.high = 0;

  this.volume = function(){return this.long*this.wide*this.high;}

  // Room surfaces
  this.surface_roof  = 0;
  this.surface_floor = 0;
  this.surface_wall_a = 0;
  this.surface_wall_b = 0;
  this.surface_wall_c = 0;
  this.surface_wall_d = 0;


  // Room walls coefficients
  this.coef_abs_roof    = 0;
  this.coef_abs_floor   = 0;
  this.coef_abs_wall_a  = 0;
  this.coef_abs_wall_b  = 0;
  this.coef_abs_wall_c  = 0;
  this.coef_abs_wall_d  = 0;


  // Room walls coefficients in octaves
  this.coef_abs_wall_a_125   = 0;
  this.coef_abs_wall_a_250   = 0;
  this.coef_abs_wall_a_500   = 0;
  this.coef_abs_wall_a_1000  = 0;
  this.coef_abs_wall_a_2000  = 0;
  this.coef_abs_wall_a_4000  = 0;
  this.coef_abs_wall_b_125   = 0;
  this.coef_abs_wall_b_250   = 0;
  this.coef_abs_wall_b_500   = 0;
  this.coef_abs_wall_b_1000  = 0;
  this.coef_abs_wall_b_2000  = 0;
  this.coef_abs_wall_b_4000  = 0;
  this.coef_abs_wall_c_125   = 0;
  this.coef_abs_wall_c_250   = 0;
  this.coef_abs_wall_c_500   = 0;
  this.coef_abs_wall_c_1000  = 0;
  this.coef_abs_wall_c_2000  = 0;
  this.coef_abs_wall_c_4000  = 0;
  this.coef_abs_wall_d_125   = 0;
  this.coef_abs_wall_d_250   = 0;
  this.coef_abs_wall_d_500   = 0;
  this.coef_abs_wall_d_1000  = 0;
  this.coef_abs_wall_d_2000  = 0;
  this.coef_abs_wall_d_4000  = 0;
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
