<template>
  <div class="about">
    <h1>About</h1>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Extra Techa"/>
      <h2>Here are all our available stores and details</h2>
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
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StoreDetailsService from '../Services/StoreDetailsService';


export default {
  name: 'about',
  data(){
    return{
      storeDetails: []
    };
  },
  methods: {
  getStoreDetails() {
    StoreDetailsService.getStoreDetails().then((response) => {
      console.log(response.data);
      this.storeDetails = response.data;
    });
  }
},

created() {
  this.getStoreDetails();
  console.log(this.storeDetails);
}

};
</script>


<style scoped>
.centered-table {
  margin: 0 auto;
}

.custom-table {
  border-collapse: collapse;
  width: 80%;
  border: 1px solid #ddd;
  font-size: 16px;
}

.custom-table th, .custom-table td {
  text-align: left;
  padding: 8px;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.custom-table tbody tr:hover {
  background-color: #ddd;
}
</style>