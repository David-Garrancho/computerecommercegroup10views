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
        <button @click="deleteEnquiry(enquiry.enquiryID)">Delete</button>
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
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day < 10 ? '0' : ''}${day} ${month < 10 ? '0' : ''}${month} ${year}`;
    },
    deleteEnquiry(enquiryId) {
      console.log(enquiryId);
      axios
        .delete(`http://localhost:8080/enquiry/delete/${enquiryId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('Enquiry deleted successfully!');
            this.enquiries = this.enquiries.filter((enquiry) => enquiry.id !== enquiryId);
            this.fetchenquiries()
          } else {
            console.error('Failed to delete enquiry:', response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error('Failed to delete enquiry:', error);
        });
    },
  },
  mounted() {
    this.fetchenquiries();
  },
};
</script>

<style>
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
