<template>

  <v-card>
   <v-toolbar>
  <v-icon large color="grey darken-2">perm_identity</v-icon>
  <v-toolbar-title>Players Directory</v-toolbar-title>
  </v-toolbar>
  
  <v-layout align-center hidden-sm-and-up justify-space-around>
    
      
    <v-card>
      <v-flex xs6 align-self-center>
      <v-card-title>Flip Your phone</v-card-title>
    </v-flex>
      <v-flex xs6>
      <v-icon x-large>screen_rotation</v-icon>
      </v-flex>
    </v-card>
    
  </v-layout>
  
    <v-layout
    hidden-xs-only
      justify-space-between
      
    >
      <v-flex xs5  >
        <v-treeview       
          :items="items"
          :load-children="fetchUsers"
          :active.sync="active"
          :open.sync="open"
          activatable
          active-class="primary--text"
          class="grey lighten-5"
          open-on-click
          transition
        >
         
          <v-icon  @click="test(item)"
            v-if="!item.children"
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >perm_identity</v-icon>
        </v-treeview>
      </v-flex>
      <v-flex
        d-flex
        text-xs-center
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selectPlayer"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a player
          </div>
          <div v-else>
          <v-card
            
            :key="selectPlayer"
            class="pt-4 mx-auto"
            flat
            max-width="400"
          >

            <v-card-text>
              <v-avatar
                 size="88"
              >
              <v-img v-if="selectPlayer.avatar" :src= selectPlayer.avatar
                  class="mb-4"
                ></v-img>
                <v-img v-else
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-4"
                ></v-img>
              </v-avatar>
              <h3 class="headline mb-2">
                {{ selectPlayer.name }}
              </h3>
              <div class="blue--text mb-2">{{ selectPlayer.position}}</div>
              <div class="blue--text subheading font-weight-bold">{{ selectPlayer.name }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout
              tag="v-card-text"
              text-xs-left
              wrap
            >
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Nationality:</v-flex>
              <v-flex>{{ selectPlayer.nationality }}</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex>
              <v-flex>
                <!-- <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a> -->
              </v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
              <!-- <v-flex>{{ selected.phone }}</v-flex> -->
            </v-layout>
          </v-card>
          </div>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>

  </v-card>
</template>

<script>

  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
  ]
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
  export default {
    data: () => ({
      active: [],
      avatar: null,
      open: [],
      users: [],
      selectPlayer: []
    }),
    computed: {
      items () {
        return [

        ]
      },
      selected () {
          console.log(this.active)
        if (!this.active.length) return undefined
        const id = this.active[0]

        return this.users.find(user => user.id === id)
      },


    },
    watch: {
      selectPlayer: 'randomAvatar'
    },
    methods: {
      async fetchUsers (item) {


        // Remove in 6 months and say
        // you've made optimizations! :)
        //await pause(1500)
        return fetch('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+ item.name)
          .then(res => res.json())
          .then(json => {

 let player = [];
  let response = json.player
    //console.log(item)
var generateOptions = function ( object ) {
  return Object.keys(object).map( function( key ) {
    return {
    	id: key,
          name: object[key].strPlayer,
          nationality: object[key].strNationality,
          position: object[key].strPosition,
          avatar: object[key].strCutout
    };
  });
}
    console.log(generateOptions(response))

            this.users = generateOptions(response)
             item.children.push(...generateOptions(response))
              console.log(item)

              })
          .catch(err => console.warn(err))
      },
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      },
      test(item){
console.log(item)
this.selectPlayer = item
      },
    createItem(){
        var teams = { "kkkn": "Bordeaux", "zdezdzed": "Caen" , "zedzed": "Caen" }

        var generateOptions = function ( object ) {
  return Object.keys(object).map( function( key ) {
    return {
    	key: key,
          name: object[key],
          children: []
    };
  });
}
this.items.push(...generateOptions(teams))




    }
    },
    created(){
         this.createItem()
    }
  }
</script>