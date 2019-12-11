<template>
    <div id="emergency-contacts-list" class="page-component">
      <div class="page-title">
        <h1 style="text-align:center">
          Emergency Contacts
        </h1>
      </div>
        <div id="contact-display-container" v-if="contacts.length > 0" >
          <b-table striped hover :items="contacts" :fields="fields">
            <template v-slot:cell(name)="data">
              {{ data.value }}
            </template>
            <template v-slot:cell(actions)="row">
              <b-button @click="mEditContact(row.item)" :disabled="disableActionButton">Edit</b-button>
              <b-button @click="mDeleteContact(row.index)" :disabled="disableActionButton">Delete</b-button>
            </template>
          </b-table>
          <!-- <div v-for="(contactObject, index) in contacts" :key="contactObject.surrogateId">

            <-- Show contact First and Last name if not selected ->
            <div
              v-show="activeIndex !== index"
              class="contact-display"
            >
              {{ contactObject.contactPriority }}. {{ contactObject.firstName }} {{ contactObject.lastName }}
              <button class="edit" @click="editContact(contactObject, index)">
                Edit
              </button>
              <button class="delete" alt="delete contact" @click="deleteContact(contactObject, index)">
                <img src="../images/trashcan.svg" alt="delete contact" />
              </button>

            </div> -->

            <!-- Duration is a millisecond value -->
            <!-- <CollapseTransition :duration="1000"> -->

            <!-- Show contact in form if selected -->
            <!-- <EmergContactForm
              v-show="activeIndex === index"
              id="emergency-contact-form"
              :activeContact="contactObject"
              :countryArray="countryArray"
              :relationArray="relationArray"
              :stateArray="stateArray"
              :isFetching="isFetching"
              @updateContact="updateContact"
            /> -->
          <!-- </CollapseTransition> -->

          <!-- </div> -->
          <!-- <button @click="clearContactForm()">
            Add Contact
          </button> -->
        </div>
        <div v-else>
          <div class="alert alert-info">
            <p>You have no emergency contacts yet.</p>
          </div>
        </div>
        <p>
          <b-button title="create" @click="mCreateContact()" :disabled="disableActionButton">Add new contact</b-button>
        </p>
        <hr />
        <div v-if="showForm">
          <h2>{{ formModeName }} Contact</h2>
          <emerg-contact-form
              v-show="activeIndex > -1"
              id="emergency-contact-form"
              :activeContact="contactObject"
              :countryArray="countryArray"
              :relationArray="relationArray"
              :stateArray="stateArray"
              :isFetching="isFetching"
              :formMode="formMode"
              @closeForm="closeForm"
              @createContact="createContact"
              @updateContact="updateContact"/>
              <!-- Note: @(event emitted by child component)=(call method of parent) -->
        </div>
        <!-- Inject modal with custom contents -->
        <modal v-if="showModal" @cancel="showModal = false" @confirm="confirmDelete()">
          <h3 slot="header">Confirm Deletion</h3>
          <p slot="body">Are you sure you want to delete this contact?<br/><b>{{ toDelete.name }}</b></p>
        </modal>
    </div>
</template>

<script>
    import { CollapseTransition } from 'vue2-transitions'
    import EmergContactForm from '@/components/EmergContactForm.vue'
    import Modal from '@/components/Modal.vue'
    import axios from 'axios'

    export default {
        name: "EmergencyContactList",
        components: {
            EmergContactForm,
            CollapseTransition,
            Modal
        },
        data: function() {
            return {
                // State flag which lets us know when all dropdown & contact resources are retrieved
                isFetching: true,
                resourcesToFetch: 4,

                // List which holds all contact objects
                contacts: [
                  {
                    'firstName': 'John',
                    'lastName': 'Doe',
                    'streetLine1': '123 N Ave',
                    'streetLine2': '',
                    'streetLine3': '',
                    'city': 'Portland',
                    'state': 'OR',
                    'zip': '12345',
                    'phoneNumber': '503-123-4567'
                  },
                  {
                    'firstName': 'Jane',
                    'lastName': 'Doe',
                    'streetLine1': '125 N Ave',
                    'streetLine2': '',
                    'streetLine3': '',
                    'city': 'Portland',
                    'state': 'OR',
                    'zip': '12345',
                    'phoneNumber': '503-234-5678'
                  }
                ],
                contactObject: {},
                // List of fields to display
                fields: [
                  {
                    key: 'name',
                    label: 'Full Name',
                    formatter: 'fullname'
                  },
                  {
                    key: 'address',
                    label: 'Address',
                    formatter: 'address'
                  },
                  'phoneNumber',
                  {
                    key: 'actions',
                    label: 'Actions'
                  }
                ],

                // The contact which occupies the form (-1 means none do by default)
                activeIndex: 0,

                // State flag which tells us not to submit a surrogateId on update the backend
                addingContact: false,

                localToAPIMap: {
                  'surrogateId': 'surrogate_id',
                  'pidm': 'pidm',
                  'contactPriority': 'priority',
                  'firstName': 'first_name',
                  'middleName': 'mi',
                  'lastName': 'last_name',
                  'city': 'city',
                  'phoneNumber': 'phone_number',
                  'zipCode': 'zip',
                  'streetLine1': 'street_line1',
                  'streetLine2': 'street_line2',
                  'streetLine3': 'street_line3',
                  'relation': 'relt_code',
                  'state': 'stat_code',
                  'country': 'natn_code',
                  'phoneCountryCode': 'ctry_code_phone',
                  'phoneAreaCode': 'phone_area',
                  'phoneExtension': 'phone_ext'
                },

                stateArray: [],
                relationArray: [],
                countryArray: [],
                formMode: 0,
                showForm: false,
                showModal: false,
                toDelete: {}
            }
        },

        mounted() {
          // Retrieve contacts from backend and store in this.contacts[]
          this.getEmergencyContactInformation()
          this.getStateDropdownOptions()
          this.getCountryDropdownOptions()
          this.getRelationDropdownOptions()
        },
        computed: {
          formModeName() {
            if (this.formMode == 1) {
              return "Create"
            }
            else if (this.formMode == 2) {
              return "Edit"
            }
            else {
              return ""
            }
          },
          disableActionButton() {
            if (this.formMode !== 0) {
              return true;
            }
            return false;
          }
        },
        methods: {
          fullname(item, key, value) {
            return `${value.firstName} ${value.lastName}`
          },
          address(item, key, value) {
            let full_address = `${value.streetLine1}`
            if (value.streetLine2) {
              full_address += `${value.streetLine2}`
            }
            if (value.streetLine3) {
              full_address += `${value.streetLine3}`
            }
            if (value.city && value.state && value.zip) {
              full_address += `${value.city}, ${value.state} ${value.zip}`
            }
            return full_address
          },
          mCreateContact() {
            this.formMode = 1;
            this.showForm = true;
            this.contactObject = {};
          },
          createContact(item) {  // "Callback" if form action was 'create'
            if (item !== 'undefined' && item !== 'null') {
              this.formMode = 0;
              this.showForm = false;
              this.contactObject = item;
              this.contacts.push(item);
              //alert(JSON.stringify(this.contactObject));  // for DEBUG only
            }
          },
          mEditContact(item) {
            console.log("EditContact" + JSON.stringify(item));
            this.formMode = 2;
            this.showForm = true;
            this.contactObject = item;
            // alert(JSON.stringify(item));       // for DEBUG only
          },
          mDeleteContact(index) {
            console.log("Delete contact: " + index);
            this.$root.$emit('submit');
            this.showModal = true;
            this.toDelete = { id: index,
                              name: this.contacts[index].firstName + " " + this.contacts[index].lastName
                            }
            // this.contacts.splice(index, 1);
          },
          confirmDelete() {
            this.contacts.splice(this.toDelete.id, 1);
            this.showModal = false;
            this.toDelete = {}
          },
          clearContactForm() {
            var vm = this;

            let blankContact = {}

            for(let localKey in this.localToAPIMap) {
              if(localKey !== 'surrogateId')
                blankContact[localKey] = null
              if(localKey === 'phone_area')
                blankContact['phone_area'] = 503
              if(localKey === 'contactPriority')
                blankContact['contactPriority'] = vm.contacts.length+1
            }

            // Add blank contact
            vm.contacts.push(blankContact)

            vm.activeIndex = vm.contacts.length-1;
            vm.addingContact = true
          },

          getRelationDropdownOptions() {
            axios({
              method: 'get',
              baseURL: 'http://127.0.0.1:8000/getRelations/',
            })
            .then(response => {
              // var relationCodes = response.data
              let relationCodes = []
              for (var i = 0; i < response.data.length; i++) {
                relationCodes.push({value: response.data[i].code, text: response.data[i].description});
              }
              this.relationArray = relationCodes
              // this.relationArray.unshift({ code: "", description: "N/A" })
              this.relationArray.unshift({ value: null, text: "N/A" })

              this.resourcesToFetch -= 1
            })
            .catch(error => console.log(error.toString()))
          },

          getStateDropdownOptions() {
            axios({
              method: 'get',
              baseURL: 'http://127.0.0.1:8000/getStateCodes/',
            })
            .then(response => {
              // var stateCodes = response.data
              let stateCodes = []
              for (var i = 0; i < response.data.length; i++) {
                stateCodes.push({value: response.data[i].id, text: " " + response.data[i].value + "(" + response.data[i].id + ")"});
              }
              this.stateArray = stateCodes
              this.stateArray.unshift({ value: null, text: "N/A" })

              this.resourcesToFetch -= 1
            })
            .catch(error => console.log(error.toString()))
          },

          getCountryDropdownOptions() {
            axios({
              method: 'get',
              baseURL: 'http://127.0.0.1:8000/getNationCodes/',
            })
            .then(response => {
              // var countryCodes = response.data
              let countryCodes = []
              for (var i = 0; i < response.data.length; i++) {
                countryCodes.push({value: response.data[i].id, text: response.data[i].value + " (" + response.data[i].phone_code + ")"});
              }
              this.countryArray = countryCodes
              // adding N/A to dropdowns, implementation could be better than hardcoded, undefined on svgimg would pass loading the image
              // need to check "N/A" value on phone_code whether it pass successfully
              this.countryArray.unshift({ value: null, text: "N/A", phone_code: "N/A", svgimg: undefined })

              this.resourcesToFetch -= 1
            })
            .catch(error => console.log(error.toString()))
          },


          // Grab contacts via axios and bind to Vue model
          async getEmergencyContactInformation() {
              var vm = this;

              await axios({
                method: 'post',
                baseURL: 'http://127.0.0.1:8000/getEmergencyContacts/',
              })
              .then(response => {
                let receivedContacts = response.data;

                // empty the previous contacts
                vm.contacts.length = 0

                for(let index in receivedContacts) {
                  let data = receivedContacts[index]

                  // Create object to hold contact information
                  // let contactObject = {}

                  // Fill object mapping from API names to more readable names
                  for(let APIKey in data) {
                    let localKey = vm.APIToLocal(APIKey)
                    vm.contactObject[localKey] = data[APIKey]
                  }

                  vm.contacts.push(contactObject)
                }

                // Sort the contacts by priority for sorted display
                let sortByPriority = (a, b) => a.contactPriority < b.contactPriority ? -1 : 1
                vm.contacts.sort(sortByPriority)

                vm.resourcesToFetch -= 1
              })
              .catch(error => console.log(error.toString()))
            },
            // Handler for updateContact events emitted by EmergContactForm components
            updateContact(contactObject) {
              var vm = this;

              // Update contact in memory
              vm.contacts[vm.activeIndex] = contactObject;

              // Update contact in database
              let bodyFormData = new FormData();

              for (let key in vm.localToAPIMap) {
                  if(key in contactObject) {
                      if(key !== 'surrogateId' || !vm.addingContact)
                          bodyFormData.set(vm.localToAPIMap[key], contactObject[key])
                  }
              }

              axios({
                method: 'post',
                baseURL: 'http://127.0.0.1:8000/updateEmergencyContact/',
                data: bodyFormData
              })
              .then(response => {
                console.log(response)
                if(response['status'] === '200')
                  if(vm.addingContact)
                    vm.addingContact = false
                  vm.getEmergencyContactInformation()
                  vm.activeIndex = -1
                  console.log('User information was updated.')
                if(response['status'] === '422')
                  console.log('Form fields incorrect or incomplete.')
              })
              .catch(error => console.log(error))


            },

            editContact(contactObject, index) {
              // If we didn't finish adding a new contact, delete it from memory
              if(this.addingContact) {
                // Delete the added contact
                this.contacts.splice(this.contacts.length-1, 1);
                this.addingContact = false
              }

              this.activeIndex = index
            },

            deleteContact(contactObject, index) {
              // Remove the contact from local memory
              this.activeIndex = -1;
              this.contacts.splice(index, 1);

              // TODO: Add Delete.
              axios({
                method: 'delete',
                baseURL: 'http://127.0.0.1:8000/updateEmergencyContact/' + contactObject.surrogateId + '/'
              })
            },


            localToAPI(key) { return this.localToAPIMap[key] },

            APIToLocal(key) {
              let APIToLocalMap = {}
              for(let localKey in this.localToAPIMap)
                APIToLocalMap[this.localToAPIMap[localKey]] = localKey

              return APIToLocalMap[key]
            },

            safeNull(str) {
              if(str === 'null')
                return ''
              return str
            },
          closeForm() {
            this.formMode = 0;
            this.showForm = false;
          }
        },

        watch: {
          resourcesToFetch: function(count) {this.isFetching = count !== 0}
        },


    }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.edit {
  font-size:14px;
  font-weight:500;
  letter-spacing:1px;
  height: 36px;
  padding-right:16px;
  padding-left:16px;
  border-radius:4px;
  box-sizing:border-box;
  margin-left:24px;
  margin-right:24px;
}

.delete {
  height: 36px;
  width: 36px;

  padding-left:0px;
  padding-right:0px;

  vertical-align: bottom;
  margin-bottom:3px;
}

.delete img {
  vertical-align: bottom;
}


</style>
