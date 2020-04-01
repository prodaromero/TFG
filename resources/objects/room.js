
function Room() {
  this.long = 0;
  this.wide = 0;
  this.high = 0;

  this.volume = function(){ return this.long*this.wide*this.high; }

  this.surface_wall_a = 0;
  this.surface_wall_b = 0;
  this.surface_wall_c = 0;
  this.surface_wall_d = 0;
  this.surface_floor  = 0;
  this.surface_roof   = 0;

  this.coef_abs_wall_a = 0;
  this.coef_abs_wall_b = 0;
  this.coef_abs_wall_c = 0;
  this.coef_abs_wall_d = 0;
  this.coef_abs_floor  = 0;
  this.coef_abs_roof   = 0;
}
