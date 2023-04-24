class Boid{
    constructor(){
      this.position=createVector(random(width), random(height)); //位置(隨機)
      this.velocity=p5.Vector.random2D();//速度
      this.velocity.setMag(random(2,4))//隨機速度
      this.acceleration=createVector();//加速度
      this.maxForce=0.2;
      this.maxSpeed=5;
    }

    edges(){
      if(this.position.x>width){
        this.position.x=0
      }else if(this.position.x<0){
        this.position.x=width
      }
      if(this.position.y>height){
        this.position.y=0
      }else if(this.position.y<0){
        this.position.y=height
      }
    }
    
    align(boids){
      let perceptionRadius=100;
      let steering=createVector();
      let total=0;
      for(let other of boids){
        let d=dist(
          this.position.x,
          this.position.y,
          other.position.x,
          other.position.y
        );
        if(other !=this&&d<perceptionRadius){
          steering.add(other.velocity);
          total++;
        }
      }
      if(total>0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        
        }
        return steering; 
    }

    cohesion(boids){
      let perceptionRadius=100;
      let steering=createVector();
      let total=0;
      for(let other of boids){
        let d=dist(
          this.position.x,
          this.position.y,
          other.position.x,
          other.position.y
        );
        if(other !=this&&d<perceptionRadius){
          steering.add(other.position);
          total++;
        }
      }
      if(total>0){
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        
        }
        return steering; 
    }

    separation(boids){
      let perceptionRadius=100;
      let steering=createVector();
      let total=0;
      for(let other of boids){
        let d=dist(
          this.position.x,
          this.position.y,
          other.position.x,
          other.position.y
        );
        if(other !=this&&d<perceptionRadius){
          let diff=p5.Vector.sub(this.position,other.position)
          diff.div(d*d);
          steering.add(diff);
          total++;
        }
      }
      if(total>0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        
        }
        return steering; 
    }

    flock(boids){
      
      let alignment=this.align(boids);
      let cohesion=this.cohesion(boids);
      let separation=this.separation(boids);
      
      alignment.mult(alignmentSlider.value())
      cohesion.mult(cohesionSlider.value())
      separation.mult(separationSlider.value())
      
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }
    
    update(){
      
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
    }
  
    
    show(){
      var colorsBlue = "04080f-507dbc-a1c6ea-bbd1ea-dae3e5".split("-").map(a=>"#"+a)
      let cc= random(colorsBlue) 
      fill(cc)
      noStroke()
     
      point(this.position.x,this.position.y,10)
      ellipse(this.position.x,this.position.y,5,5)
      
      
      
      
      //point(this.position.x,this.position.y);
    }
  }