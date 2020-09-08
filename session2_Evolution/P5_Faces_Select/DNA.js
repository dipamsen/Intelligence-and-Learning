class Face {
  constructor() {
    this.dna = {
      eyeSize: random(),
      faceSize: random(),
      mouthX: random(),
      mouthY: random(),
      eyeColor: random()
    };
  }
}

class Population extends Array {
  constructor(len) {
    super();
  }
}