const express = require('express');
const app = express();
app.use(express.urlencoded());
app.use(express.json());

const StreamChat = require('stream-chat').StreamChat;
//Server Side

//Instantiating Client

//const client = new StreamChat('STREAM_KEY', 'STREAM_API_SECRET', {});

const client = new StreamChat('atggmdphetx7', 
'kkf55pqmu3hztrr8ndfdswv4fj8zrs5v6e3c9jz6v2a5k893padt35krb3bj79sc', {});

// Create a few users
const userID = "Seetha";
const userID1 = "Lakshmi";

async function serverside(req, res){

    let response;
    
    try { 
        
        response = await client.setUser(
        { 
            id: userID, 
            role: 'admin', 
            favorite_color: 'green'
        }  ,
        { 
            id: userID1, 
            role: 'admin', 
            favorite_color: 'blue'
        }      
    );
    console.log(response);
    }
     catch(err) { 
        
     console.log('error'); 
     return (response)
     }



//Update User

let updateResponse;

try {  
    
    updateResponse =  await client.updateUsers([{ 
    id: userID, 
    role: 'admin', 
    book: 'dune'
 }]);
 console.log(updateResponse);
} 
catch(err)
{
    console.log('error'); 
    return (updateResponse)
}




//Instantiating a channel

let channel;

try {

    channel = await client.channel('team', 'spacex', {
    image: "image",
    created_by: 'Seetha',
});
const resp = channel.create();
}
catch(err)
{
    console.log('error'); 
    return (resp);
}




//Add some to channels
let add;

try {
add = await channel.addMembers(['Seetha', 'Lakshmi']);
}
catch(err)
{
    console.log('error'); 
    return (add);
}



//Update channel to have a name

let update;

try {

    update = await channel.update(
    {
        name: 'myspecialchannel',
        color: 'green',
    },
    { text: 'Seetha changed the channel color to green', user_id: "Seetha" }
);
}
catch(err)
{
    console.log('error'); 
    return (update);
}

//Add/Remove channel members ?

let remove;

try {
remove = await channel.removeMembers(['Lakshmi']);
}
catch(err)
{
    console.log('error'); 
    return (remove);
}


//Promote a moderator

let promote;

try {
    promote = await channel.addModerators(['Seetha', 'Lakshmi']);
}
catch(err)
{
    console.log('error'); 
    return (promote);
}


//Ban a user

// ban a user for 60 minutes from all channel
let data;

try {
   data = await client.banUser('eviluser', {
        timeout: 60,
        reason: 'Banned for one hour',
    });

}
catch(err)
{
    console.log('error'); 
    return (data);
}



// ban a user from the livestream:fortnite channel
try {
    data =  await channel.banUser('eviluser', {
        reason: 'Profanity is not allowed here',
    });
 
 }
 catch(err)
 {
     console.log('error'); 
     return (data);
 }

}




// Client Side

//Fetch a channel list


const filter = { type: 'messaging', members: { $in: ['thierry'] } };
const sort = { last_message_at: -1 };

let channels=[];

async function funquery(req, res){
     channels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true
    });

      if (channels.err) { console.log('error');}
      else { console.log('fetched response');}
}

for (const c of channels) {
    console.log(c.custom.name, c.cid);
}
                    

//Send a message


async function funsendmessage(req, res){

    const message = await channel.sendMessage({
        text: '@Josh I told them I was pesca-pescatarian. Which is one who eats solely fish who eat other fish.',
        attachments: [
            {
                type: 'image',
                asset_url: 'https://bit.ly/2K74TaG',
                thumb_url: 'https://bit.ly/2Uumxti',
                myCustomField: 123
            }
        ],
        mentioned_users: [josh.id],
        anotherCustomField: 234
    });
    
      if (message.err) { console.log('error');}
      else { console.log('fetched response');}
}


                    

//Edit a message

async function funsendmessage(req, res){

    let message1 = { id: 123, text: 'the edited version of my text' };
    
    try {
        const update1 = await client.updateMessage(message1);
    } 
                        
      catch (err) { console.log('error');}
      

      //Flag a message
try {
const flag = await client.flagMessage(message1.id);
}
catch (err) { console.log('error');}


//Add reaction to message ?

try {
const reaction = channel.sendReaction(message1.id, {
    type: 'love',
    myCustomField: 123,
});
}catch (err) { console.log('error');}

}

                    


app.listen(process.env.PORT || 3002, () => {
    console.log("Working Stream");
}); 
