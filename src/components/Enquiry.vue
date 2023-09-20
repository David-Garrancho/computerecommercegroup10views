<template>
    <div class="container">
      <h1>Enquiry Form</h1>
      <form @submit.prevent="submitEnquiry">
        <div class="form-group">
          <label for="enquiryName">Name:</label>
          <input type="text" id="enquiryName" v-model="enquiryName" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="enquirySubjectLine">Subject Line:</label>
          <input type="text" id="enquirySubjectLine" v-model="enquirySubjectLine" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="enquiryBodyContent">Body:</label>
          <textarea id="enquiryBodyContent" v-model="enquiryBodyContent" required class="form-input"></textarea>
          <p>Word Count: {{ wordCount }}</p>
        </div>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  </template>
  

  <script>
  import axios from 'axios';
  import { computed, ref } from 'vue'; // Import ref here
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Enquiry',
    setup() {
      const store = useStore();
      const user = computed(() => store.getters.getUser);
      const router = useRouter();
  
      const enquiryName = ref(""); // Use ref here
      const enquirySubjectLine = ref(""); // Use ref here
      const enquiryBodyContent = ref(""); // Use ref here
      const enquiryDate = ref(new Date().toISOString());
      const customer = computed(() => user.value);
  
      const wordCount = computed(() => {
        const words = enquiryBodyContent.value.split(/\s+/).filter(word => word.trim() !== "");
        return words.length;
      });
  
      const submitEnquiry = () => {
        const enquiryData = {
          enquiryName: enquiryName.value,
          enquirySubjectLine: enquirySubjectLine.value,
          enquiryBodyContent: enquiryBodyContent.value,
          customer: customer.value,
          enquiryDate: enquiryDate.value,
        };
  
        axios.post('http://localhost:8080/enquiry/create', enquiryData)
          .then(response => {
            console.log('Enquiry submitted successfully:', response.data);
  
            enquiryName.value = "";
            enquirySubjectLine.value = "";
            enquiryBodyContent.value = "";
            enquiryDate.value = new Date().toISOString();
          })
          .catch(error => {
            console.error('Failed to submit enquiry:', error);
          });
      };
  
      return {
        enquiryName,
        enquirySubjectLine,
        enquiryBodyContent,
        enquiryDate,
        customer,
        wordCount,
        submitEnquiry,
      };
    },
  };
  </script>
  
  


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  text-align: left;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  min-width: 700px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
  font-size: 16px;
  resize: vertical;
}

.form-textarea {
  width: 100%;
  min-height: 150px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #544db0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #8780e8;
}
</style>
