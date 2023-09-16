<template>
    <div class="container">
    <h1 class="text-center">Customer List</h1>
    <table class="table table-striped centered-table">
            <thead>
                <th>Customer ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Password</th>
            </thead>
            <tbody>
                <tr v-for="customer in customers" :key="customer.id"> 
                    <td>{{ customer.customerID }}</td> 
                    <td>{{ customer.firstName }}</td> 
                    <td>{{ customer.lastName }}</td> 
                    <td>{{ customer.email }}</td> 
                    <td>{{ customer.password }}</td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import CustomerService from '../Services/CustomerService';

export default {
  name: 'Customers',
  data() {
    return {
      customers: []
    };
  },
  methods: {
    getCustomers() {
      CustomerService.getCustomers().then((response) => {
        this.customers = response.data;
      });
    }
  },
  created() {
    this.getCustomers();
  }
};
</script>

<style scoped>
.centered-table {
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
}

.centered-table th,
.centered-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.centered-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.centered-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>