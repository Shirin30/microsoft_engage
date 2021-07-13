# microsoft_engage

This project aims to implement the features present in the Microsoft Teams using React and Firebase deployed using vercel. The main functionality present in the website is the group video conference features with the team members and group conversations that can be started before the meet and continued during the meetings as well after the meeting is over.

Firstly, all the users of the website have to be authenticated. The authentication is done using Firebase Authentication. The authenticated users are saved in the database provided by firebase firestore. The authenticated users are also used to create users in chatengine.io used to build the chat system.


![image](https://user-images.githubusercontent.com/63365275/125437846-520c1fb0-bc7f-4b70-be50-eb23a3af7302.png)


![image](https://user-images.githubusercontent.com/63365275/125438261-6bbcf017-1a8d-436e-8513-cf1b83fa6950.png)


The next feature was to build the video conferencing feature for multiple users to join and converse across different computers. Jitsi's external API is used to connect users over video conferences. Jitsi’s Iframe functions are overridden to make custom features like toggle audio, toggle video, hangup call, tile view, text chat during video calls that are continued even after the call, share screen etc.
Images can also be shared in the text chat.

![image](https://user-images.githubusercontent.com/63365275/125438839-cbbae871-646e-442f-8860-c528ad3c9145.png)

Avatars can be uploaded and chats can be created/deleted. Users can leave the groups/teams.
messages/links/files can be sent in the chats and messages can also be deleted.

![image](https://user-images.githubusercontent.com/63365275/125439013-107efeeb-3b55-4751-9322-9e70cfd79480.png)

![image](https://user-images.githubusercontent.com/63365275/125439100-5458cd38-748c-473f-ac3d-435f11638698.png)

Every team also consists of a File section where important files can be uploaded. This is implemented by using firebase storage.

![image](https://user-images.githubusercontent.com/63365275/125439198-9ab55156-690b-4a09-b24a-bc8c3353362c.png)

There is a section to schedule important meetings using react-calendar and whenever a meet is scheduled, members of the group get an email regarding the same.

![image](https://user-images.githubusercontent.com/63365275/125439277-0c52c658-214d-4ccc-888f-06cdf785b97b.png)

The link for the website is in youtube description.
