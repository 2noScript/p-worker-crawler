import { chromium } from 'playwright'
import { log } from 'console'
import { PROXY } from './constant.js'





(async () => {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
  
 
      const webRtcCode = `
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }  // STUN server của Google
        ]
      });
  
      // Tạo và hiển thị một offer
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
          console.log('Offer created and set as local description');
        })
        .catch(error => {
          console.error('Error creating offer:', error);
        });
  
      // Log ICE candidate
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          console.log('ICE Candidate:', event.candidate);
        }
      };
    `;
    await page.evaluate(webRtcCode);
    await page.goto('https://browserleaks.com/webrtc');
     
  
  })();


