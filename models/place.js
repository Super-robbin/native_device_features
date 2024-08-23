class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.24232, lng: 124.324 }
    this.id = new Date().toString() + Math.random().toString();
  }
}
