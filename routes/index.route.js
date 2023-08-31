require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { GetIndexPage } = require('../controllers/index.controller');
const { Login, Register } = require('../controllers/user.controller');
const Blog = require('../model/Blog');
const User = require('../model/User');



// routing
// router.get('/', GetIndexPage);
router.get('/', function(req, res){
    res.render('index');
});


// router.get('/login', Login);

// router.get('/register', Register);

router.get('/test', function (req, res) {
    res.send('Testing');
})



// AddField();
// function InsertBlog() {
//     Blog.insertMany([
//         {
//             title: 'Cultivating Creativity: Unleashing Your Inner Genius',
//             content: 'Introduction: In a world that values innovation and originality, cultivating creativity has become more important than ever. Whether you\'re an artist, writer, entrepreneur, or simply someone looking to infuse more imagination into your daily life, tapping into your inner genius can lead to fulfilling and impactful experiences. In this blog post, we will explore strategies and techniques to nurture and unleash your creative potential.\nEmbrace Curiosity:\nCreativity thrives on curiosity. Cultivate a sense of wonder and a thirst for knowledge. Explore new subjects, ask questions, and challenge conventional wisdom. By embracing curiosity, you open yourself up to new perspectives and ideas that can fuel your creative endeavors.\n\nCreate a Stimulating Environment:\nYour physical and mental environment plays a crucial role in nurturing creativity. Surround yourself with inspiring books, artwork, and objects that ignite your imagination. Designate a dedicated space for your creative pursuits, free from distractions. Experiment with different lighting, colors, and sounds to find what stimulates your mind and enhances your creative flow.\n\nCultivate a Growth Mindset:\nBelieve in your ability to grow and develop creatively. Embrace failures and setbacks as opportunities for learning and growth. Adopt a growth mindset that focuses on progress rather than perfection. Recognize that creativity is a journey, and each step forward, no matter how small, brings you closer to your creative potential.\n\nEngage in Divergent Thinking:\nDivergent thinking is a key component of creative problem-solving. Practice brainstorming techniques such as mind mapping or freewriting to generate a multitude of ideas. Allow yourself to think outside the box and explore unconventional solutions. Embrace ambiguity and explore different perspectives to uncover unique and innovative approaches.\n\nEmbrace Solitude and Reflection:\nIn our fast-paced, connected world, carving out time for solitude and reflection is essential for creative growth. Disconnect from technology and take regular breaks to give your mind the space it needs to wander and make unexpected connections. Engage in activities like meditation, journaling, or nature walks to foster introspection and tap into your inner creative reservoir.\n\nSeek Inspiration from Diverse Sources:\nExpand your horizons by exposing yourself to diverse sources of inspiration. Explore different art forms, cultures, and disciplines. Attend exhibitions, read books from various genres, listen to podcasts, and engage in conversations with people from different backgrounds. The more diverse your sources of inspiration, the richer and more unique your creative output can become.\nEmbrace Collaboration and Feedback:\nCreativity thrives in a collaborative environment. Seek out fellow creatives, join communities, and engage in constructive discussions. Share your work-in-progress and welcome feedback. Collaboration not only expands your creative network but also exposes you to different perspectives and approaches that can elevate your own work.\n\nConclusion:\nCultivating creativity is a lifelong journey that requires dedication, curiosity, and a willingness to explore the unknown. By embracing curiosity, creating a stimulating environment, adopting a growth mindset, engaging in divergent thinking, seeking solitude, and drawing inspiration from diverse sources, you can unlock your inner genius and unleash your creative potential. Remember, creativity is within all of us, waiting to be awakened and expressed in ways that are uniquely our own. So go forth, embrace your creative spirit, and let your imagination soar.',
//         },
//         {
//             title: 'The Art of Effective Communication: Building Stronger Connections',
//             content:'Introduction:\nCommunication is the foundation of human interaction. It shapes our relationships, influences our decisions, and impacts our personal and professional lives. However, effective communication is a skill that requires attention, practice, and a genuine desire to connect with others. In this blog post, we will explore the art of effective communication and provide practical tips to help you build stronger connections in all areas of your life.\n\nActive Listening:\nOne of the most important aspects of effective communication is active listening. Practice giving your full attention to the person speaking, without interrupting or formulating your response prematurely. Show genuine interest by maintaining eye contact, nodding, and using verbal cues to indicate your engagement. Reflect back on what you\'ve heard to ensure understanding and encourage further conversation.\n\nClear and Concise Expression:\nTo convey your thoughts and ideas effectively, strive for clarity and conciseness in your expression. Use simple and straightforward language, avoiding jargon or complex terminology unless necessary. Organize your thoughts before speaking or writing, and ensure your message is focused and easy to follow. Consider the needs and background of your audience to tailor your communication accordingly.\n\nNon-Verbal Communication:\nNon-verbal cues play a significant role in communication. Pay attention to your body language, facial expressions, and tone of voice, as they can convey emotions and intentions more powerfully than words alone. Maintain an open and approachable posture, use appropriate gestures, and modulate your voice to match the tone of the conversation. Be mindful of how your non-verbal cues may be perceived by others.\n\nEmpathy and Emotional Intelligence:\nDeveloping empathy and emotional intelligence is crucial for effective communication. Seek to understand the emotions and perspectives of others, putting yourself in their shoes. Practice empathy by validating their feelings and demonstrating understanding. Be aware of your own emotions and how they may influence your communication style. Cultivate emotional intelligence by managing your emotions effectively and responding empathetically to others.\n\nFeedback and Constructive Criticism:\nProviding and receiving feedback is an essential part of effective communication. When offering feedback, be specific, constructive, and focus on behaviors rather than personal attacks. Use "I" statements to express your perspective and provide suggestions for improvement. When receiving feedback, maintain an open mind, listen attentively, and avoid becoming defensive. View feedback as an opportunity for growth and self-improvement.\n\nAdaptability and Flexibility:\nEffective communication requires adaptability and flexibility to accommodate different communication styles and preferences. Be willing to adjust your approach based on the needs and preferences of others. Adapt your communication style to different situations, cultures, and personalities to foster better understanding and connection. Cultivate a mindset of openness and curiosity to embrace new perspectives and enhance your communication skills.\n\nConclusion:\nEffective communication is a lifelong journey that requires continuous learning and practice. By actively listening, expressing yourself clearly, being mindful of non-verbal cues, cultivating empathy, embracing feedback, and adapting to different communication styles, you can build stronger connections and enhance your relationships. Remember, effective communication is not just about transmitting information but also about fostering understanding, empathy, and collaboration. So, let us nurture our communication skills and create meaningful connections that enrich our personal and professional lives.',
//         }
//     ]);
// }
// InsertBlog();
// function InsertUser(){
//     User.insertMany(
//         [
//             {
//                 username: 'Ethan Mitchell',
//                 email:'ethan.mitchell@example.com',
//                 gender:1,
//                 age:32,
//                 phone:'0958568524',
//                 password:'password',
//             },
//             {
//                 username: 'Catherine Reynolds',
//                 email:'CatherineReynolds@example.com',
//                 gender:0,
//                 age:34,
//                 phone:'0958745862',
//                 password:'password',
//             },
//             {
//                 username: 'Olivia Bennett',
//                 email:'olivia.bennett@example.com',
//                 gender:0,
//                 age:27,
//                 phone:'0974586528',
//                 password:'password',
//             },
//             {
//                 username: 'Lucas Anderson',
//                 email:'lucas.anderson@example.com',
//                 gender:1,
//                 age:42,
//                 phone:'0986524856',
//                 password:'password',
//             },
//             {
//                 username: 'Sophia Ramirez',
//                 email:'sophia.ramirez@example.com',
//                 gender:0,
//                 age:35,
//                 phone:'0965254853',
//                 password:'password',
//             },
//         ]
//     )
// }
// InsertUser();

// function InsertBlog() {
//     Blog.insertMany([
//         {
//             title: 'The Wellness Corner: Nurturing Mind, Body, and Soul',
//             content: 'Welcome to "The Wellness Corner," a sanctuary of knowledge and inspiration dedicated to nurturing your mind, body, and soul. In today\'s fast-paced and demanding world, finding balance and prioritizing our well-being has become more important than ever. \nThis blog is a haven where we delve into the realms of self-care, holistic health, personal growth, and spiritual exploration. Join us on this transformative journey as we explore practical tips, insightful wisdom, and empowering practices that will guide you towards a more harmonious and fulfilling life. Step into "The Wellness Corner" and embrace the transformative power of self-care and holistic well-being.',
//             authorID:'{"$oid":"64f0086923f43238c6b817ca"}',
//             author:'Ethan Mitchell',
//             preview:'Welcome to "The Wellness Corner," a sanctuary of knowledge and inspiration dedicated to nurturing your mind, body, and soul. In today\'s fast-paced and demanding world, finding balance and prioritizing our well-being has become more important than ever. \nThis blog is a haven where we delve into the realms of self-care, holistic health, personal growth, and spiritual exploration. Join us on this transformative journey as we explore practical tips, insightful wisdom, and empowering practices that will guide you towards a more harmonious and fulfilling life. Step into "The Wellness Corner" and embrace the transformative power of self-care and holistic well-being.',
//         },

//     ]);
// }
// InsertBlog();



module.exports = router;
