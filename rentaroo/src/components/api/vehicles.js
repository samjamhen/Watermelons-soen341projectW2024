// Mock function to simulate fetching available vehicles from an API
// TO DO: Replace with actual API call later

export function getAvailableVehicles() {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for available vehicles
      const vehicles = [
        { id: 1, make: 'Toyota', model: 'Corolla' },
        { id: 2, make: 'Honda', model: 'Civic' },
        { id: 3, make: 'Ford', model: 'Fusion' },
        // Add more vehicle data as needed
      ];
      resolve(vehicles);
    }, 1000); // Simulate delay of 1 second
  });
}
