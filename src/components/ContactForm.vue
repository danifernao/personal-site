<template>
  <form @submit.prevent="submitForm" ref="form">
    <ContactFormStatus v-if="status !== 'default'" :status="status" :message="form.status" />
    <fieldset :disabled="!form.enabled">
      <label for="name">{{ form.name.label }}</label>
      <input type="text" id="name" v-model="name" @keyup="checkThis" />
      <label for="email">{{ form.email.label }}</label>
      <input type="text" id="email" v-model="email" @keyup="checkThis" />
      <label for="message">{{ form.message.label }}</label>
      <textarea id="message" v-model="message" @keyup="checkThis($event); autoSize()" ref="textarea"></textarea>
      <input type="submit" :value="form.button.label" :disabled="!dataIsValid || status === 'sending'" />
    </fieldset>
  </form>
</template>

<script>
  import ContactFormStatus from './ContactFormStatus.vue'
  
  export default {
    name: 'ContactForm',
    data () {
      return {
        action: '',
        name: '',
        email: '',
        message: '',
        status: 'default',
        timeout: {
          'home': null,
          'email': null,
          'message': null
        },
        errors: {
          'name': true,
          'email': true,
          'message': true
        }
      }
    },
    computed: {
      dataIsValid () {
        return Object.values(this.errors).every(item => item === false)
      }
    },
    props: {
      form: Object
    },
    components: {
      ContactFormStatus
    },
    methods: {
      autoSize () {
        const textarea = this.$refs.textarea;
        textarea.style.height = 0;
        textarea.style.height = `${textarea.scrollHeight}px`;
      },
      regExp (string) {
        const regParts = string.match(/^\/(.*?)\/([gim]*)$/)
        const regExp = regParts ? new RegExp(regParts[1], regParts[2]) : new RegExp(string)
        return regExp
      },
      checkThis (event) {
        const element = event.target
        
        element.setCustomValidity('')
        element.reportValidity()
        
        clearTimeout(this.timeout[element.id])
        
        this.timeout[element.id] = setTimeout(function () {
          const isValid = element.value.match(this.regExp(this.form[element.id].regEx))
          const message = !isValid ? this.form[element.id].errorMessage : ''
          this.errors[element.id] = !isValid
          element.setCustomValidity(message)
          element.reportValidity()
        }.bind(this), 1000)
      },
      submitForm () {
        if (this.form.enabled && this.dataIsValid) {
          this.status = 'sending'
          this.$refs.form.scrollIntoView()
          
          const formData = new URLSearchParams()
          formData.append('name', this.name)
          formData.append('email', this.email)
          formData.append('message', this.message)
          formData.append('formGoogleSheetName', 'soy-daniel')
          formData.append('formDataNameOrder', '["name","email","message"]')
          
          fetch(this.form.action, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
          })
          .then(response => response.json())
          .then(() => {
            this.name = ''
            this.email = ''
            this.message = ''
            this.status = 'success'
            Object.keys(this.errors).forEach(key => { this.errors[key] = true });
          })
          .catch(() => {
            this.status = 'error'
          })
          .finally(() => {
            setTimeout(function () {
              this.status = 'default'
            }.bind(this), 3000)
          })
        }
      }
    },
    mounted () {
      if (!this.form.enabled) {
        this.status = 'warning'
      }
    }
  }
</script>

<style scoped>
  :invalid {
    border-color: red !important;
    outline: none;
  }
  
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  label {
    display: block;
  }
  
  input:not[type="submit"] {
    width: 50%;
  }
  
  input,
  textarea {
    margin: 0.5rem 0 1rem;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    padding: 0.4rem;
    background-color: rgb(var(--color-app-background));
    border: 0.06rem solid #BBBBBB;
    border-radius: 0.3rem;
    box-shadow: none;
    color: rgb(var(--color-app-text));
    font-family: inherit;
    font-size: 0.9rem;
  }
  
  textarea {
    width: 100%;
    min-height: 6.25rem;
    overflow: hidden;
  }
  
  input[type="submit"] {
    margin-right: 0.5rem;
    margin-bottom: 0;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    border: none;
    background-color: rgb(var(--color-app-foreground));
    color: rgb(var(--color-app-background));
    font-family: inherit;
    font-size: 0.9rem;
    transition: background-color .1s ease-out;
  }
  
  input[type="submit"]:active {
    background-color: #C8344F;
  }
  
  input[type="submit"]:disabled {
    opacity: 0.5;
  }
  
  @media only screen and (min-width: 760px) {
    input[type="submit"]:not(:disabled):hover {
      background-color: #D93351;
    }
  }
</style>