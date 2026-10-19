


Authentication system guidence for ai agents:

features:
1. jwt access and refreshToken
2. validate jwt signeture and validate with database 
3. token reuse detection and revocation
4. change refresh token and access token whene genarate new token and use refresh token
5. genarage sessionId to validate specific device and multi device expreience

Token Workefow:
token will ganarate with jwt signeture accccess token expire time 7min and refresh token expire time 30 days if use are regular use application then it will be and continius update and make a infinite time loged in 

Cokkie workfloow:
accessCookie expire time :7min and refresh token expire time 30 days with use refresh token it will reset with new access adn refresh token it make unlimited time logedin

The session id concept :
create a unique session it it will given after login and send with cookie the session id is the mian indentitifire of a device and session 

reviek and reuse detection:
 save sessionId,token tow defrent schema liken, accessToken,refreshToken  refresh token schema alowasy storoe previus 1 token is user user a refresh token 2 times the system will delete the document then in disc device will logout and all device still ok , access token also saved in database but it not use reuse it just valided user is eraly authentice throw previosed token gen time saved tokn in database hash if hash match then user can login 







 abar puro plan ta amake banglai bolo and max time qustion korte pare better result ar jonno
 