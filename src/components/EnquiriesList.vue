<template>
    <div>
      <h1>Enquiries List</h1>
      <ul class="inquiry-list" v-if="enquiries && enquiries.length">
        <li v-for="enquiry in enquiries" :key="enquiry.id" class="inquiry-item">
          <h2>{{ enquiry.enquirySubjectLine }}</h2>
          <p><strong>Name:</strong> {{ enquiry.enquiryName }}</p>
          <p><strong>Body Content:</strong> {{ enquiry.enquiryBodyContent }}</p>
          <p><strong>Date:</strong> {{ formattedDate(enquiry.enquiryDate) }}</p>
          <p><strong>Customer:</strong> {{ enquiry.customer.firstName }} {{ enquiry.customer.lastName }}</p>
          <p><strong>Customer email:</strong> {{ enquiry.customer.email }}</p>
          <hr />
        </li>
      </ul>
      <p v-else>No enquiries found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EnquiriesList',
    data() {
      return {
        enquiries: [],
      };
    },
    mounted() {
      this.fetchenquiries();
    },
    methods: {
      fetchenquiries() {
        axios
          .get('http://localhost:8080/enquiry/getAll')
          .then((response) => {
            this.enquiries = response.data;
          })
          .catch((error) => {
            console.error('Failed to fetch enquiries:', error);
          });
      },
      formattedDate(dateString) {
        // Assuming dateString is in ISO format (e.g., "yyyy-mm-dd")
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
  
        // Format the date as "dd mm yyyy"
        return `${day < 10 ? '0' : ''}${day} ${month < 10 ? '0' : ''}${month} ${year}`;
      },
    },
  };
  </script>
  
  <style>
  /* Add CSS styles to remove list-style and style the inquiries */
  .inquiry-list {
    list-style: none;
    padding: 0;
  }
  
  .inquiry-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    background-color: #f9f9f9;
  }
  </style>
  