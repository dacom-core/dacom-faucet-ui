<template>
<el-row>
<el-row>
  <el-col :span="3" style="margin-top: 10px; width: 200px; position: absolute;">
  <div >
  <div style=" float: left; margin-left: 10px;">{{$t("language")}}</div>
      <ul class="languagepicker">
        <span v-if="locale=='en'" v-on:click="english()" ><li>🇺🇸English</li></span>
        <span v-if="locale=='en'" v-on:click="russian()" ><li>🇷🇺Русский</li></span>
        <span v-if="locale=='ru'" v-on:click="russian()" ><li>🇷🇺Русский</li></span>
        <span v-if="locale=='ru'" v-on:click="english()" ><li>🇺🇸English</li></span>
        
      </ul>
  </div>
</el-col>
  <el-col style="margin-top: 60px;" :span="24" :xs="24" :md="24">
    <div>
      <img class="logo" src="./../assets/logo.png">  
    </div>
      
  </el-col>

</el-row>

<el-row v-if="(step==1)" type="flex" align="middle" justify="center" class="centered_inputs">
  
  <el-col :span="24" :xs="24" :md="24">
    <div class="centered_inputs">
      <p>{{$t("here_you_can_register")}} {{app}}</p>
      <p>{{$t("let_choose_a_nickname")}}</p>
      <p></p>
    </div>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
      <el-form-item label="Username" prop="username">
        <el-input v-model ="ruleForm2.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">{{$t("check_it")}}</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>

<el-row v-if="step==2" type="flex" align="middle" justify="center" class="centered_inputs">
        <el-col :xl="24" :lg="24" :xs="24" :md="24">
      <div class="centered_inputs">
      <p>{{$t("save_the_keys")}}</p>
      <div class="keys">
        <p><b>{{$t("active_private_key")}}:</b></p> 
        <p class="key">{{privkey1}}</p>
        <p><b>{{$t("active_public_key")}}:</b></p>
        <p class="key">{{pubkey1}}</p>
        <p><b>{{$t("owner_private_key")}}:</b></p>
        <p class="key">{{privkey1}}</p>
        <p><b>{{$t("owner_public_key")}}:</b> 
        <p class="key">{{pubkey1}}</p>
      </div>
      <p>{{$t("key_descriptor")}}</p>
      <el-button type="primary" @click="go_to_choice()">{{$t("saved")}}</el-button>
    </div>
  </el-col>
</el-row>

<el-row v-if="step==3" class="dynamic" type="flex" justify="space-around">
    <el-col  :xl="8" :lg="8" :xs="24" :md="8">
      <div style="text-align: center">
        <h2>{{$t("conditionally_registration")}}</h2>
        <h3>{{$t("one_task")}}</h3>
        <el-button type="primary" @click="go_to_task()">{{$t("get_one_task")}}</el-button>
        <p >{{$t("you_are_inveted")}}</p>
      </div>      
    </el-col>

    <el-col v-if="mode == 1" :xl="8" :lg="8" :xs="24" :md="8">
      <div style="text-align: center">
        <h2>{{$t("Phone-confirm registration")}}</h2>
        <p >{{$t("paid_account")}}</p>
        <p>{{$t("phone")}}</p>
          <el-input style="padding-bottom: 20px" mask="\+1" type ="tel" v-model="phoneForm.phone"></el-input> 
          <el-input v-if="phoneForm.sended" placeholder="" type ="tel" placeholder="Enter SMS-code"  v-model="phoneForm.code"></el-input> 
      </div>
      <div style="padding-top: 15px">
      <el-button type="primary" @click="requestSMS()">{{$t("Request SMS")}}</el-button>
      <el-button type="primary" v-if="phoneForm.sended" @click="verify()">{{$t("Verify Code")}}</el-button>
  
    </div>
    </el-col>

    <el-col  :xl="8" :lg="8" :xs="24" :md="8">
      <div style="text-align: center">
        <h2>{{$t("paid_registration")}}</h2>
        <h3>10 TT</h3>
        <el-button type="primary" @click="go_to_buy()">{{$t("choise")}}</el-button>
        <p >{{$t("paid_account")}}</p>
      </div>
    </el-col>

</el-row>

<el-row v-if="step==3" class="reset" type="flex" justify="space-around">
      <el-button type="danger" @click="reset()">{{$t("reset")}}</el-button>
</el-row>


<el-row v-if="step==4" type="flex" align="middle" justify="center" class="centered_inputs">
      <el-col :xl="24" :lg="24" :xs="24" :md="24">
      <div class="centered_inputs">
      <p style="text-align: center">{{$t("username")}}: <u>{{username}}</u></p>
      
      <p>{{$t('transfer_tt')}}<a target="_blank" href="https://wallet.travelchain.io">wallet.travelchain.io</a> {{$t("to_account_with_memo")}}'{{username}}'.</p>
      <div class="keys"><p>transfer your_tc_old_username registrator 10 TT "{{username}}" true</p></div>
      {{$t("account_will_be_registered")}}</p>
      <el-button type="info" @click="step--">{{$t("back")}}</el-button>
      <el-button type="danger" @click="reset()">{{$t("reset")}}</el-button>
      <div class="loader"></div>
      <div>
        <p><b>{{$t("example")}}</b></p>
        <p>TC-Old account: dark.sun</p>
        <p>Amount: 10 TT</p>
        <p>New TC-EOS account: imtraveleler</p>
        <img class="instruction" src="./../assets/transfer_tt.jpg">
      </div>
      
    </div>
  </el-col>
</el-row>


<el-row v-if="step==20" type="flex" align="middle" justify="center" class="centered_inputs">
      <el-col :xl="24" :lg="24" :xs="24" :md="24">
      <div class="centered_inputs">
      <p>{{$t("username")}}: </p>
      <div class="keys">{{username}}  </div>
      <p>{{$t("personal_eth")}}: </p>
      <div class="keys">{{eth}} </div>
      <p>{{$t("transfer")}} <span class="keys">{{topay}}</span>
      {{$t("account_will_be_registered")}}</p>
      <el-button type="info" @click="step--">{{$t("back")}}</el-button>
      <el-button type="danger" @click="reset()">{{$t("reset")}}</el-button>
      <div class="loader"></div>
      
    </div>
  </el-col>
</el-row>

<el-row v-if="step==6" type="flex" align="middle" justify="center" class="centered_inputs">
      <div class="centered_inputs">
      <p style="text-align: center">{{$t("username")}}: <u>{{username}}</u></p>
      <p>{{$t("task1")}}</p>
      <div class="keys">{{$t("task2")}}</div>
      <p>{{$t("after_task_complete")}}</p>
      <div style="padding-bottom: 15px;">
        <el-input :disabled="task_sended == 1" v-model ="link_to_task"></el-input>
      </div>
      <el-button type="info" @click="step=3">{{$t("back")}}</el-button>
      <el-button type="danger" @click="reset()">{{$t("reset")}}</el-button>
      <el-button v-if="task_sended==0" type="success"  @click="task_confirm()">{{$t("confirm")}}</el-button>
      <div style="margin-top: 25px; background: gainsboro;border: 1px solid; text-align: center;" v-if="admin_message_flag==1">
        <div style=""><b>{{$t("message_from_community")}}:</b></div>
        <div>{{admin_comment}}</div>
      </div>
      <div v-if="task_sended==1" class="loader"></div>
    </div>
</el-row>


<el-row v-if="step==10" type="flex" align="middle" justify="center" class="centered_inputs">
      <div style = "text-align: center;" class="centered_inputs">
      <h2>{{$t("welcome_to")}} {{app}}</h2>
      <h3>{{$t("account")}} <u>{{username}}</u> {{$t("is_registered")}}</h3>
      <p>{{$t("import_keys")}} {{app}}</p>
      <p><a href="https://get-scatter.com/">https://get-scatter.com/</a></p>
      <el-button type="danger" @click="reset()">{{$t("reset")}}</el-button>

    </div>
</el-row>


</el-row>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
Vue.localStorage.get('_eos_new_account', "''")
Vue.localStorage.get('_eos_username_reserved_flag', false)
Vue.localStorage.get('_eos_keys_saved_flag', false)
Vue.localStorage.get("_eos_task_sended", 0)

let ecc = require('eosjs-ecc')
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
        mode: 2, //0 task-mode, 1 - phone-mode, 2 - pay-mode

        locale: "en",
        app: "TravelChain",
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
        },
        phoneForm:{
          phone: "+",
          code:"",
          sended: 0
        },
        phonerules:{
          phone: [
            {}
          ]
        }
      };
    },
    created(){

      var saved_username =  Vue.localStorage.get('_eos_new_account')
      this.username = saved_username
      
      var step = Vue.localStorage.get('_eos_step', 1)
      this.step= step
      var locale = Vue.localStorage.get('_eos_locale', 'en')
      if (locale == "ru")
        this.$locale = 'ru'

      this.locale = locale

      var eth = Vue.localStorage.get('_eos_eth', "")
        this.eth= eth
      
      var topay = Vue.localStorage.get('_eos_topay', "")
        this.topay = topay

      var task_sended = Vue.localStorage.get('_task_sended', 0)
        this.task_sended = task_sended
      
      this.app = process.env.APP

      this.mode = process.env.mode

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
    components:{
      MaskedInput
    },
    methods: {
      
      requestSMS(){
        var self = this
        this.phoneForm.sended = 1;
    
      },
      submitForm(formName) {
        var self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.localStorage.set("_eos_new_account", this.username)
            Vue.localStorage.set('_eos_step', 2)
            self.step = 2

            
            axios.post(process.env.registrator + 'regkeys.php', {
              username: self.username,
              active_pub: self.pubkey1,
              owner_pub: self.pubkey2
            })

          } else {
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
        axios.post(process.env.registrator + 'geteth.php', {
              username: this.username
            }).then(data => {
              console.log(data)
              this.eth = data.data.addr
              this.topay = data.data.to_pay
              Vue.localStorage.set("_eos_eth", data.data.addr)
              Vue.localStorage.set("_eos_topay", data.data.to_pay)
              this.step = 4
              Vue.localStorage.set("_ eos_step", 4)
            })
      },

      go_to_task(){
        this.step = 6
        Vue.localStorage.set("_eos_step", 6)
      },

      task_confirm(){
        axios.post(process.env.registrator + 'set_complete_task.php', {
              username: this.username,
              link: this.link_to_task,
            }).then(data => {
              this.task_sended = 1
              this.admin_message_flag = 0
              Vue.localStorage.set("_eos_task_sended", 1)
              //Here need enable loader and disable complete button

            })
      },

      get_status(){
        axios.post(process.env.registrator + 'get_status.php', {
              username: this.username,
            }).then(data => {
              if (data['data']['registered'] == 1){
                this.step = 10
                Vue.localStorage.set("_eos_step", 10)
                
              }
              if (data['data']['admin_comment'] != null){
                this.admin_comment = data['data']['admin_comment']
                this.task_sended = 0
                this.admin_message_flag = 1
                Vue.localStorage.set("_eos_task_sended", 0)
                console.log(data['data']['admin_comment'])
              }

              //Here need change step or status message if admin error
            })
      },

      go_to_choice(){
        this.step = 3
        Vue.localStorage.set("_eos_step", 3)
      },
      reset(){
        this.username = ""
        this.topay =""
        this.eth = ""
        this.step = 1
        this.ruleForm2.username = ""
        this.pending = true
        this.task_sended = 0
        Vue.localStorage.set("_eos_step", 1)
        Vue.localStorage.set("_eos_eth", "")
        Vue.localStorage.set("_eos_topay", "")
        Vue.localStorage.set("_eos_new_account", "")
        Vue.localStorage.set("_task_sended", 0)
        

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
          axios.post(process.env.registrator + 'status.php', {
              username: this.username
            }).then(data => {
              if (data=="success"){
                console.log(data)
                this.step=5
              } 
            })
      },
      russian(){
        this.locale = 'ru'
        this.$locale = 'ru'
        Vue.localStorage.set('_eos_locale', "ru")
            
      },
      english(){
        this.locale = 'en'
        this.$locale = 'en'
        Vue.localStorage.set('_eos_locale', "en")
            
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
    font-size: 14px;
    margin-bottom: 20px;
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

.languagepicker {
  background-color: #FFF;
  display: inline-block;
  padding: 0;
  height: 40px;
  overflow: hidden;
  transition: all .3s ease;
  margin: 0 50px 10px 0;
  vertical-align: top;
  float: left;
  cursor: pointer;
}

.languagepicker:hover {
  /* don't forget the 1px border */
  height: 81px;
}

.languagepicker a{
  color: #000;
  text-decoration: none;
}

.languagepicker li {
  display: block;
  padding: 0px 20px;
  line-height: 40px;
  border-top: 1px solid #EEE;
}

.languagepicker li:hover{
  background-color: #EEE;
}

.languagepicker a:first-child li {
  border: none;
  background: #FFF !important;
}

.languagepicker li img {
  margin-right: 5px;
}

.roundborders {
  border-radius: 5px;
}

.large:hover {
  /* 
  don't forget the 1px border!
  The first language is 40px heigh, 
  the others are 41px
  */
  height: 245px;
}

.reset{
  padding-top: 50px;
  padding-bottom: 50px;
}
@media only screen and (max-width : 1000px) {
    .dynamic {
        display: grid !important;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    .key{
      font-size: 10px;
    }
}

.instruction{
  padding-top: 20px;
  width: 100%;
}
</style>
