<template>
<el-row>
<el-row>
  <el-col :span="6" :xs="24" :md="24">
    <div>
      <img class="logo" src="./../assets/logo.png">  
    </div>
      
  </el-col>

</el-row>

<el-row v-if="(step==1)" type="flex" align="middle" justify="center" class="centered_inputs">
  <el-col :span="8" :xs="24" :md="24">
    <div class="centered_inputs">
      <p>Here you can register an DACom Protocol account</p>
      <p>First, let's choose a nickname. It should consist of 12 characters of type 12345a-z and not have dots or special characters.</p>
      <p>Make yourself one: </p>
    </div>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
      <el-form-item label="Username" prop="username">
        <el-input v-model ="ruleForm2.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">Check it</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>

<el-row v-if="step==2" type="flex" align="middle" justify="center" class="centered_inputs">
        <el-col :span="12" :xs="24" :md="24">
      <div class="centered_inputs">
      <p>Save the account keys: </p>
      <div class="keys">
        <p><b>Active Private Key:</b></p> 
        <p class="key">{{privkey1}}</p>
        <p><b>Active Public Key:</b></p>
        <p class="key">{{pubkey1}}</p>
        <p><b>Owner Private Key:</b></p>
        <p class="key">{{privkey1}}</p>
        <p><b>Owner Public Key:</b> 
        <p class="key">{{pubkey1}}</p>
      </div>
      <p>An active account key is required to sign transactions on the network. And with the help of the owner's key, you can restore access to the account if the active key is lost. If both keys are lost, you will not be able to recover your account. Keep them as keys from your heart!. </p>
      <el-button type="primary" @click="go_to_choice()">Saved!</el-button>
    </div>
  </el-col>
</el-row>

<el-row v-if="step==3" type="flex"  justify="space-around">
    <el-col :span="6" :xs="24" :md="8">
      <div style="text-align: center">
        <h2>Paid Registration</h2>
        <h3>50$</h3>
        <el-button type="primary" @click="go_to_buy()">Pay</el-button>
        <p style="text-align: justify;">The account comes with 64kb RAM and temporarily unlimited CPU and NET bandwidth. The account can be used to launch its own branches of the Protocol and has all the necessary resources for this.</p>
      </div>
    </el-col>

    <el-col :span="6" :xs="24" :md="8">
      <div style="text-align: center">
        <h2>Conditionally-Free Registration</h2>
        <h3>Complete 1 task</h3>
        <el-button type="primary" @click="go_to_task()">Get Task</el-button>
        <p style="text-align: justify;">You are invited to perform one simple task from the community. After completing the job verification, the account will be registered with 4 KB of RAM and some bandwidth restrictions. The account can be used to participate in existing branches of the Protocol.</p>
      </div>      
    </el-col>
</el-row>

<el-row v-if="step==4" type="flex" align="middle" justify="center" class="centered_inputs">
      <div class="centered_inputs">
      <p>Cost of account registration: 50 USD. With the account will be delivered 64kb of RAM and sufficient bandwidth CPU and NET, which is enough for free use of the DACom operating system.</p>
      <p>Username: </p>
      <div class="keys">{{username}}  </div>
      <p>Your personal ETH address: </p>
      <div class="keys">{{eth}} </div>
      <p>Transfer <span class="keys">{{topay}}</span> ETH, and after several confirmations, your account will be registered.</p>
      <p>After payment, just wait on this page. Your account will be delivered as soon as possible. In case of problems, contact consultant.</p>
      <el-button type="info" @click="step--">back</el-button>
      <el-button type="danger" @click="reset()">reset</el-button>
      <div class="loader"></div>
      
    </div>
</el-row>

<el-row v-if="step==6" type="flex" align="middle" justify="center" class="centered_inputs">
      <div class="centered_inputs">
      <p>Task: Just make a post in any social network with following content: </p>
      <div class="keys">DACom Protocol - The Way to a Human Freedom on a New Age. https://dacom.io</div>
      <p>After complete the task, put direct link to post in the folowing input, confirm it and wait on this page. Your account will be delivered as soon as possible. In case of problems, contact a consultant.</p>
      <div style="padding-bottom: 15px;">
        <el-input :disabled="task_sended == 1" v-model ="link_to_task"></el-input>
      </div>
      <el-button type="info" @click="step=3">back</el-button>
      <el-button type="danger" @click="reset()">reset</el-button>
      <el-button v-if="task_sended==0" type="success"  @click="task_confirm()">Confirm</el-button>
      <div style="margin-top: 25px; background: gainsboro;border: 1px solid; text-align: center;" v-if="admin_message_flag==1">
        <div style=""><b>Message from Community:</b></div>
        <div>{{admin_comment}}</div>
      </div>
      <p style="text-align: center">New User: {{username}}</p>
      <div v-if="task_sended==1" class="loader"></div>
      
    </div>
</el-row>


<el-row v-if="step==10" type="flex" align="middle" justify="center" class="centered_inputs">
      <div style = "text-align: center;" class="centered_inputs">
      <h2>Welcome to DACom Operation System</h2>
      <h3>Account <u>{{username}}</u> is registered</h3>
      <p>Now you can import keys in DScatter and use Protocol on the way to Freedom.</p>
      <el-button type="danger" @click="reset()">reset</el-button>

    </div>
</el-row>


</el-row>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
Vue.localStorage.get('eos_new_account', "''")
Vue.localStorage.get('eos_username_reserved_flag', false)
Vue.localStorage.get('eos_keys_saved_flag', false)
Vue.localStorage.get("eos_task_sended", 0)

let ecc = require('tcjs-ecc')
let TcApi = require('eosjs-api')
let options = {
  httpEndpoint: "https://eost.travelchain.io", 
  verbose: false, // API logging
  sign:true,
  logger: { // Default logging functions

  },
  fetchConfiguration: {}
}

let tcapi = TcApi(options)


export default {
  name: "Home",

    data() {
      var checkAccount = (rule, username, callback) => {
        if (!username) {
          return callback(new Error('Please input the username'));
        }
        setTimeout(() => {
          if (this.isValidUsername(username)) {
            callback(new Error('Username must have only this symbols: 1-5a-z'));
          } else {
            if (username.length != 12) {
              callback(new Error('Username must have 12 symbols'));
            } else {
              this.checkCreated(username, callback)
            }
          }
        }, 1000);
      };
      
      return {
        username: "",
        privkey1: "",
        pubkey1: "",
        privkey2: "",
        pubkey2: "",
        link_to_task:"https://",
        admin_message_flag: 0,
        step: 1,
        eth: "",
        topay: "",
        pending: true,
        task_sended: 0,
        ruleForm2: {
          username: this.username
        },
        rules2: {
          username: [
            { validator: checkAccount, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      var saved_username =  Vue.localStorage.get('eos_new_account')
      this.username = saved_username
      
      var step = Vue.localStorage.get('eos_step', 1)
      this.step= step
      
      var eth = Vue.localStorage.get('eos_eth', "")
        this.eth= eth
      
      var topay = Vue.localStorage.get('eos_topay', "")
        this.topay = topay
      var task_sended = Vue.localStorage.get('task_sended', 0)
        this.task_sended = task_sended
      
      console.log("this.username", this.username)

      ecc.randomKey().then(privateKey => {
        this.privkey1 = privateKey
        this.pubkey1 = ecc.privateToPublic(privateKey)
      })
      ecc.randomKey().then(privateKey => {
        this.privkey2 = privateKey
        this.pubkey2 = ecc.privateToPublic(privateKey)
      })


      this.intervalid1 = setInterval(function(){
        this.get_status()
      }.bind(this), 30000);


    },
    
    methods: {
      submitForm(formName) {
        var self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(self.username)
            Vue.localStorage.set("eos_new_account", this.username)
            Vue.localStorage.set('eos_step', 2)
            self.step = 2

            
            axios.post(process.env.registrator + 'php-registrator/regkeys.php', {
              username: self.username,
              active_pub: self.pubkey1,
              owner_pub: self.pubkey2
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      isValidUsername(username){
        const regex = /^[a-z1-5]+$/gm;
        let m = regex.exec(username)
        if (m == null)
          return true
        else return false

      },
      checkCreated(username, callback){
        tcapi.getTableRows(true, "eosio", username, 'userres', 'owner', 0, -1, 1000).
          then(data=>{
            if (data.rows.length != 0)
              callback(new Error('Username already registered'));
            this.username = username
            callback()
          })
      },
      go_to_buy(){
        axios.post(process.env.registrator + 'php-registrator/geteth.php', {
              username: this.username
            }).then(data => {
              console.log(data)
              this.eth = data.data.addr
              this.topay = data.data.to_pay
              Vue.localStorage.set("eos_eth", data.data.addr)
              Vue.localStorage.set("eos_topay", data.data.to_pay)
              this.step = 4
              Vue.localStorage.set("eos_step", 4)
            })
      },

      go_to_task(){
        this.step = 6
        Vue.localStorage.set("eos_step", 6)
      },

      task_confirm(){
        axios.post(process.env.registrator + 'php-registrator/set_complete_task.php', {
              username: this.username,
              link: this.link_to_task,
            }).then(data => {
              this.task_sended = 1
              this.admin_message_flag = 0
              Vue.localStorage.set("eos_task_sended", 1)
              //Here need enable loader and disable complete button

            })
      },

      get_status(){
        axios.post(process.env.registrator + 'php-registrator/get_status.php', {
              username: this.username,
            }).then(data => {
              if (data['data']['registered'] == 1){
                this.step = 10
                Vue.localStorage.set("eos_step", 10)
                
              }
              if (data['data']['admin_comment'] != null){
                this.admin_comment = data['data']['admin_comment']
                this.task_sended = 0
                this.admin_message_flag = 1
                Vue.localStorage.set("eos_task_sended", 0)
                console.log(data['data']['admin_comment'])
              }

              //Here need change step or status message if admin error
            })
      },

      go_to_choice(){
        this.step = 3
        Vue.localStorage.set("eos_step", 3)
      },
      reset(){
        this.username = ""
        this.topay =""
        this.eth = ""
        this.step = 1
        this.ruleForm2.username = ""
        this.pending = true
        this.task_sended = 0
        Vue.localStorage.set("eos_step", 1)
        Vue.localStorage.set("eos_eth", "")
        Vue.localStorage.set("eos_topay", "")
        Vue.localStorage.set("eos_new_account", "")
        Vue.localStorage.set("task_sended", 0)
        

        ecc.randomKey().then(privateKey => {
          this.privkey1 = privateKey
          this.pubkey1 = ecc.privateToPublic(privateKey)
        })
        
        ecc.randomKey().then(privateKey => {
          this.privkey2 = privateKey
          this.pubkey2 = ecc.privateToPublic(privateKey)
        })
        

      },
      checkstatus(){
          axios.post(process.env.registrator + 'php-registrator/status.php', {
              username: this.username
            }).then(data => {
              if (data=="success"){
                this.step=5
              } 
            })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logo{
  width: 200px;
  padding-bottom: 30px;
  opacity: 0.7;
}
.keys{
    background: gainsboro;
    border: 1px solid;
    text-align: center;
}
.key{
  font-size: 12px;
}
.centered_inputs{
    font-size: 18px;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    text-align: justify;
}
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #475157;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
