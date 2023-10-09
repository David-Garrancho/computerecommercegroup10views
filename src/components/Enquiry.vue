<template>
  <div class="container">
    <h1 v-if="customer">{{customer.firstName}}'s Enquiry Form</h1>
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
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Enquiry',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const enquiryName = ref('');
      const enquirySubjectLine = ref('');
      const enquiryBodyContent = ref('');
      const enquiryDate = ref(new Date().toISOString());
      const customer = ref(null);

      const getTokenData = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const tokenParts = accessToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('Token payload:', payload);
          return payload.sub;
        }
      }
      return null;
    };

    const user = computed(() => {
      const tokenData = getTokenData();
      return tokenData ? tokenData : null;
    });

  
    const fetchUserDetails = async () => {
      try {
        console.log('user email:', user.value);
        const response = await axios.get(`http://localhost:8080/user/${user.value}`);
        customer.value = response.data;
        console.log('user:', customer.value);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
      onMounted(() => {
        fetchUserDetails();
      });
  
      const wordCount = computed(() => {
        const words = enquiryBodyContent.value.split(/\s+/).filter(word => word.trim() !== '');
        return words.length;
      });
  
      const submitEnquiry = () => {
      const userDto = {
        customerID: customer.value.customerID,
        firstName: customer.value.firstName,
        lastName: customer.value.lastName,
        email: customer.value.email,
        password: customer.value.password,
      };

      const enquiryData = {
        enquiryName: enquiryName.value,
        enquirySubjectLine: enquirySubjectLine.value,
        enquiryBodyContent: enquiryBodyContent.value,
        customer: userDto,
        enquiryDate: enquiryDate.value,
      };

      axios
        .post('http://localhost:8080/enquiry/create', enquiryData)
        .then(response => {
          console.log('Enquiry submitted successfully:', response.data);

          enquiryName.value = '';
          enquirySubjectLine.value = '';
          enquiryBodyContent.value = '';
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
