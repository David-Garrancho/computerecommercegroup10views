<template>
     <h3>Current locations</h3>
      <table class="table table-striped centered-table custom-table">
        <colgroup>
          <col style="width: 15%;">
          <col style="width: 15%;">
          <col style="width: 20%;">
          <col style="width: 20%;">
          <col style="width: 20%;">
          <col style="width: 10%;">
        </colgroup>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Telephone number</th>
            <th>Email</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="store in storeDetails" :key="store.storeID"> 
          <td>{{ store.storeName }}</td> 
          <td>{{ store.storeTel }}</td> 
          <td>{{ store.storeEmail }}</td> 
          <td>{{ store.address ? store.address.streetAddress : 'N/A' }}</td>
          <td>{{ store.address ? store.address.city.cityName : 'N/A' }}</td>
          <td>{{ store.address ? store.address.city.country.countryName : 'N/A' }}</td>
          <button @click="deleteStoreDetails(store.storeID)">delete</button>
        </tr>
      </tbody>
      </table>

      <br><br>

    <div class="store-creation">
      <h2>Create Store Location</h2>

      <!-- Form for creating a country -->
      <div class="form">
        <h3>Create Country</h3>
        <div class="form-group">
          <label for="countryName">Country Name</label>
          <input type="text" id="countryName" v-model="countryName" required />
        </div>
        <button @click="createCountry">Create Country</button>
      </div>
  
      <!-- Form for creating a city -->
      <div class="form">
        <h3>Create City</h3>
        <div class="form-group">
          <label for="cityName">City Name</label>
          <input type="text" id="cityName" v-model="cityName" required />
        </div>
        <div class="form-group">
          <label for="countrySelect">Select Country</label>
          <select id="countrySelect" v-model="selectedCountry" required>
            <option value="" disabled>Please select a country</option>
            <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.countryName }}</option>
          </select>
        </div>
        <button @click="createCity">Create City</button>
      </div>
  
      <div class="form">
        <h3>Create Address</h3>
        <div class="form-group">
          <label for="streetAddress">Street Address</label>
          <input type="text" id="streetAddress" v-model="streetAddress" required />
        </div>
        <div class="form-group">
          <label for="postalCode">Postal Code</label>
          <input type="text" id="postalCode" v-model="postalCode" required />
        </div>
        <div class="form-group">
          <label for="citySelect">Select City</label>
          <select id="citySelect" v-model="selectedCity" required>
            <option value="" disabled>Please select a city</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.cityName }}</option>
          </select>
        </div>
        <button @click="createAddress">Create Address</button>
      </div>
  
      <!-- Form for creating a store location -->
      <div class="form">
        <h3>Create Store Details</h3>
        <div class="form-group">
          <label for="storeName">Store Name</label>
          <input type="text" id="storeName" v-model="storeName" required />
        </div>
        <div class="form-group">
          <label for="storeTel">Store Telephone</label>
          <input type="text" id="storeTel" v-model="storeTel" required />
        </div>
        <div class="form-group">
          <label for="storeEmail">Store Email</label>
          <input type="email" id="storeEmail" v-model="storeEmail" required />
        </div>
        <div class="form-group">
          <label for="addressSelect">Select Address</label>
          <select id="addressSelect" v-model="selectedAddress" required>
            <option value="" disabled>Please select an address</option>
            <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.streetAddress }}</option>
          </select>
        </div>
        <button @click="createStoreDetails">Create Store Location</button>
      </div>
    </div>

  
  </template>
  
  <script>
  import axios from 'axios';
  import StoreDetailsService from '../Services/StoreDetailsService';

  
  export default {
    name: 'StoreCreation',
    data() {
      return {
      storeDetails: [],
      countryName: '',
      cityName: '',
      streetAddress: '',
      postalCode: '',
      storeName: '',
      storeTel: '',
      storeEmail: '',
      selectedCountry: null,
      selectedCity: null,
      selectedAddress: null,
      countries: [],
      cities: [],
      addresses: [],
    };
  },
    methods: {
      createCountry() {
        axios
          .post('http://localhost:8080/country/create', { countryName: this.countryName })
          .then((response) => {
            this.countries.push(response.data);
            this.selectedCountry = response.data.id;
            console.log('Country created:', response);
          })
          .catch((error) => {
            console.error('Failed to create a country:', error);
          });
      },

      createCity() {
        const selectedCountry = this.countries.find((country) => country.id === this.selectedCountry);
        if (!selectedCountry) {
          console.error('Please select a country before creating a city.');
          return;
        }

        axios
          .post('http://localhost:8080/city/create', {
            cityName: this.cityName,
            country: selectedCountry,
          })
          .then((response) => {
            this.cities.push(response.data);
            this.selectedCity = response.data.id;
            console.log('City created:', response);
          })
          .catch((error) => {
            console.error('Failed to create a city:', error);
          });
      },

      createAddress() {
        const selectedCity = this.cities.find((city) => city.id === this.selectedCity);
        if (!selectedCity) {
          console.error('Please select a city before creating an address.');
          return;
        }

      axios
        .post('http://localhost:8080/address/create', {
          streetAddress: this.streetAddress,
          postalCode: this.postalCode,
          city: selectedCity,
        })
        .then((response) => {
          this.addresses.push(response.data);
          this.selectedAddress = response.data.id;
          console.log('Address created:', response);
        })
        .catch((error) => {
          console.error('Failed to create an address:', error);
        });
    },

      createStoreDetails() {
        const selectedAddress = this.addresses.find((address) => address.id === this.selectedAddress);
        if (!selectedAddress) {
          console.error('Please select a city before creating an address.');
          return;
        }

        axios
          .post('http://localhost:8080/storeDetails/create', {
            storeName: this.storeName,
            storeTel: this.storeTel,
            storeEmail: this.storeEmail,
            address: selectedAddress,
          })
          .then(() => {
            console.log('Store details created successfully');
          })
          .catch((error) => {
            console.error('Failed to create store details:', error);
          });
      },

      loadCountries() {
            axios
            .get('http://localhost:8080/country/getAll')
            .then((response) => {
                this.countries = response.data;
                console.log('Countries loaded:', this.countries);
            })
            .catch((error) => {
                console.error('Failed to load countries:', error);
            });
        },

        loadCities() {
        axios
          .get(`http://localhost:8080/city/getAll`)
          .then((response) => {
            this.cities = response.data;
            console.log('Cities loaded:', this.cities);
          })
          .catch((error) => {
            console.error('Failed to load cities:', error);
          });
      },


      loadAddresses() {
          axios
            .get(`http://localhost:8080/address/getAll`)
            .then((response) => {
              this.addresses = response.data;
              console.log('Addresses loaded:', this.addresses);
            })
            .catch((error) => {
              console.error('Failed to load addresses:', error);
            });
      },

      getStoreDetails() {
    StoreDetailsService.getStoreDetails().then((response) => {
      console.log(response.data);
      this.storeDetails = response.data;
    });
  },

  deleteStoreDetails(storeID) {
      if (confirm('Are you sure you want to delete this StoreDetails?')) {
        axios
          .delete(`http://localhost:8080/storeDetails/delete/${storeID}`)
          .then(() => {
            this.storeDetails = this.storeDetails.filter((store) => store.storeID !== storeID);
            console.log('Store details deleted successfully');
          })
          .catch((error) => {
            console.error('Failed to delete store details:', error);
          });
      }
    },
    },
    watch: {
      selectedCountry: 'loadCities',
      selectedCity: 'loadAddresses',
    },
    created() {
      this.loadCountries();
      this.loadCities();
      this.loadAddresses();
      this.getStoreDetails();
    },
  };
  </script>
  
  
  
  <style scoped>
.store-creation {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.form {
  display: grid;
  grid-gap: 15px;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width: 100%;
}

button {
  padding: 10px 20px;
  background-color: #544db0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #8780e8;
}

.table-container {
    margin: 20px;
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th, .table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .table th {
    background-color: #f5f5f5;
  }

  .table tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
</style>