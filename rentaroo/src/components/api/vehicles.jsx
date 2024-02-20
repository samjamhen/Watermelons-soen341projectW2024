// Mock function to simulate fetching available vehicles from an API
// TO DO: Replace with actual API call later
    
    //export function getAvailableVehicles() {
    //return new Promise((resolve, reject) => {
    // Simulate API call delay
    // setTimeout(() => {
    // Mock data for available vehicles
    //  const vehicles = [
    //    { id: 1, make: 'Toyota', model: 'Corolla' },
    //    { id: 2, make: 'Honda', model: 'Civic' },
    //    { id: 3, make: 'Ford', model: 'Fusion' },

const vehicles = [
  {
    color: 'Red',
    mileage:120500,
    year: 2018,
    make:'Toyota',
    model: 'Camry',
    price: 35,
    transmission: 'Automatic',
    image: 'https://example.com/images/red-camry.jpg'
  },
  {
    color: 'Blue',
    mileage:78200,
    year: 2020,
    make: 'Volkswagen',
    model: 'Golf',
    price: 40,
    transmission: 'Manual',
    image: 'https://example.com/images/blue-corolla.jpg'
  },
  {
    color: 'Silver',
    mileage:56000,
    year: 2019,
    make: 'Honda',
    model: 'Civic',
    price: 45,
    transmission: 'Automatic',
    image: 'https://example.com/images/silver-civic.jpg'
  },
  {
    color: 'White',
    mileage:20800,
    year: 2024,
    make: 'Nissan',
    model: 'Atima',
    price: 70,
    transmission: 'Automatic',
    image: 'https://example.com/images/silver-civic.jpg'
  },
  {
    color: 'Black',
    mileage:35000,
    year: 2009,
    make: 'Nissan',
    model: 'Versa',
    price: 12,
    transmission: 'Manual',
    image: 'https://example.com/images/silver-civic.jpg'
  }
]
export default vehicles;