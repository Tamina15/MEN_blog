const Admin = require('../../model/Admin');
const User = require('../../model/User');
const Blog = require('../../model/Blog');
const { ObjectId } = require('mongodb');
const layout = './admin/layouts/admin';

const css = ['adminBlogs.css'];
const searchType = 'blog';


async function GetBlogPage(req, res) {
    const blogs = await Blog.find({}).sort({ 'createdAt': -1 });
    console.log("Getting All Blogs")
    res.render('./admin/adminBlogs', { layout, css, searchType, blogs });
}

async function GetSingleBlog(req, res) {
    const id = req.params.id;
    console.log("Getting " + id)
    try {
        const blog = await Blog.findById({ "_id": id });
        if (!blog) {
            return GetBlogPage(req, res);
        }
        res.render('./admin/adminBlogEdit', { layout, css, searchType, blog });
    }
    catch (error) {
        res.redirect('back');
    }
}
function InsertBlog(req, res) {

}
async function UpdateBlog(req, res) {
    // console.log(req.body);
    const id = req.params.id;
    const title = req.body.title;
    const authorID = req.body.authorID;
    const content = req.body.content;
    const preview = req.body.preview;
    const blog = {
        id, title, authorID, content, preview
    }
    if (!id) {
        console.log('Update Blog Fail. Missing Field')
        return Render(req, res, './admin/adminBlogEdit', { layout: false, css, searchType, blog, message: 'Update Blog Fail' })
    }
    const find = await Blog.findById({ "_id": id });
    console.log(find.authorID)
    if (!find || (authorID != find.authorID)) {
        console.log('Update Blog Fail. AuthorID wrong')
        return Render(req, res, './admin/adminBlogEdit', { layout: false, css, searchType, blog, message: 'Update Blog Fail' })
    }
    const update = { $set: blog };
    const result = await Blog.updateOne({ "_id": id }, update);
    if (!result.acknowledged) {
        console.log('Update Blog Fail. Cannot Update')
        return Render(req, res, './admin/adminBlogEdit', { layout: false, css, searchType, blog, message: 'Update Blog Fail' })
    }
    console.log('Update Blog Success');
    res.json({ statusCode: 1 });
}

async function DeleteBlog(req, res) {
    const id = req.body.id;
    if (!id) {
        console.log('No ID, Cannot Delete');
        return res.redirect('/admin/dashboard/blogs?message=No ID. Cannot Delete')
    }
    const result = await Blog.deleteOne({ _id: id });
    // console.log('Delete Blog: ' + id + ' with result: ' + result);
    if (!result.acknowledged) {
        console.log('Fail to Delete');
        return res.redirect('/admin/dashboard/blogs?message=Fail to Delete')
    }
    res.redirect('/admin/dashboard/blogs?message=Delete Success');
}
function Render(req, res, page, params) {
    res.render(page, params, (err, renderedContent) => {
        if (err) {
            console.error('Error rendering partial:', err);
            res.status(500).send('Error rendering partial');
        } else {
            // console.log(renderedContent);
            res.send(renderedContent);
        }
    });
}






















// function name() {

//     Blog.insertMany([{
//         title: 'The Benefits of Regular Exercise',
//         content: 'Introduction:\n    In today\'s fast-paced world, finding time for exercise often takes a back seat. However, regular exercise brings an array of physical, mental, and emotional benefits that make it a crucial aspect of a healthy lifestyle. In this blog post, we will explore the numerous advantages of engaging in regular exercise and why it should be a priority for everyone.\n    \n    Body:\n    \n    Physical Health Benefits:\n    a. Improved cardiovascular health: Regular exercise strengthens the heart, improves blood circulation, and reduces the risk of heart disease.\n    b. Weight management: Exercise helps maintain a healthy weight by burning calories and increasing metabolism.\n    c. Stronger muscles and bones: Physical activity promotes muscle growth, enhances bone density, and reduces the risk of osteoporosis.\n    d. Enhanced immune system: Regular exercise boosts the immune system, reducing the likelihood of common illnesses.\n    \n    Mental and Cognitive Benefits:\n    a. Stress reduction: Exercise releases endorphins, which act as natural stress relievers, improving mood and reducing anxiety and depression.\n    b. Increased energy and productivity: Physical activity enhances energy levels, mental focus, and productivity throughout the day.\n    c. Improved sleep quality: Regular exercise helps regulate sleep patterns, leading to better quality sleep and increased overall well-being.\n    d. Cognitive function enhancement: Exercise has been shown to improve memory, concentration, and overall cognitive performance.\n    \n    Emotional Well-being:\n    a. Boosted self-confidence: Regular exercise improves body image, self-esteem, and self-confidence.\n    b. Social connections: Participating in group exercises or team sports can foster social connections and a sense of community.\n    c. Mood elevation: Exercise stimulates the release of endorphins, which elevate mood and promote a sense of happiness and well-being.\n    \n    Conclusion:\n    Regular exercise offers a multitude of benefits for physical health, mental well-being, and emotional balance. From improving cardiovascular health and maintaining a healthy weight to reducing stress and boosting cognitive function, exercise is vital for leading a healthy and fulfilling life. Make a commitment to incorporate physical activity into your daily routine and reap the rewards of a stronger body and a happier mind.\n    \n    Remember, before beginning any exercise program, it\'s important to consult with a healthcare professional or fitness expert to ensure it aligns with your individual needs and abilities.\n    \n    We hope this blog post helps you understand the importance of regular exercise and motivates you to prioritize it in your life.\n    ',
//         authorID: '64f0086923f43238c6b817cb',
//         preview: 'In today\'s fast-paced world, finding time for exercise often takes a back seat. However, regular exercise brings an array of physical, mental, and emotional benefits that make it a crucial aspect of a healthy lifestyle. In this blog post, we will explore the numerous advantages of engaging in regular exercise and why it should be a priority for everyone.',
// }, {
//     title: 'The Power of Positive Thinking: How It Can Transform Your Life',
//     content: 'Introduction:\nPositive thinking is a mindset that focuses on optimism, gratitude, and the belief \nthat good things can happen. While it may seem simple, the power of positive \nthinking can have a profound impact on our lives. In this blog post, we will explore \nhow adopting a positive mindset can transform your life and lead to greater \nhappiness, success, and overall well-being.\n\n1. Improved Mental and Emotional Well-being:\n   a. Reduced stress and anxiety: Positive thinking helps to reduce stress levels and minimize anxiety by shifting our focus towards solutions and positive outcomes.\n   b. Enhanced resilience: A positive mindset enables us to bounce back from set backs and challenges, fostering greater resilience and mental strength.\n   c. Increased self-confidence: Positive thinking helps to build self-esteem and self-confidence, enabling us to embrace opportunities and overcome self-doubt.\n\n2. Health and Physical Benefits:\n   a. Strengthened immune system: Studies have shown that positive thinking can boost the immune system, leading to better overall health and resistance to illness.\n   b. Improved cardiovascular health: Positive thinkers often experience lower blood pressure, reduced risk of heart disease, and improved cardiovascular health.\n   c. Increased longevity: ResearchType suggests that individuals with a positive outlook on life tend to live longer and have a higher quality of life.\n\n3. Greater Success and Achievement:\n   a. Improved problem-solving skills: Positive thinkers approach challenges with a proactive and solutions-oriented mindset, leading to improved problem-solving abilities.\n   b. Enhanced creativity and innovation: Positive thinking fosters a mindset that embraces possibilities, leading to increased creativity and innovative thinking.\n   c. Stronger relationships and networking: Positive individuals attract and maintain positive relationships, opening doors to new opportunities and collaborations.\n\n4. Increased Happiness and Fulfillment:\n   a. Greater gratitude and appreciation: Positive thinkers cultivate a sense of gratitude, appreciating the present moment and finding joy in the little things.\n   b. Optimistic outlook on life: Positive thinking helps to shift our perspective towards the positive aspects of life, leading to increased happiness and contentment.\n   c. Sense of purpose and meaning: A positive mindset allows us to find purpose and meaning in our actions, leading to a more fulfilling and satisfying life.\n\nConclusion:\nThe power of positive thinking cannot be underestimated. By embracing a positive mindset, we can transform our lives in countless ways. From improved mental and emotional well-being to better physical health, enhanced success, and increased happiness, positive thinking has the potential to shape our lives for the better. Cultivate positivity, practice gratitude, and embrace optimism to unlock the transformative power of positive thinking in your own life.',
//     authorID: '64f0086923f43238c6b817cd',
//     preview: 'Positive thinking is a mindset that focuses on optimism, gratitude, and the belief that good things can happen. While it may seem simple, the power of positive thinking can have a profound impact on our lives. In this blog post, we will explore how adopting a positive mindset can transform your life and lead to greater happiness, success, and overall well-being.'
// }, {
//     title: 'Unveiling the Wonders of the Cosmos: Exploring the Fascinating World of Astronomy',
//     content: 'Astronomy, the study of celestial objects and the universe as a whole, has captivated humans since ancient times. From the twinkling stars in the night sky to the mind-boggling expanse of galaxies, astronomy offers a glimpse into the vastness and mysteries of the cosmos. In this blog post, we embark on a journey to explore the fascinating world of astronomy, delving into its importance, breakthrough discoveries, and the awe-inspiring wonders that await us beyond our Earthly home.\n\nThe Importance of Astronomy:\na. Understanding our place in the universe: Astronomy helps us comprehend the vastness of space and our place in the grand cosmic tapestry, fostering a sense of humility and curiosity.\nb. Advancing scientific knowledge: Through the study of celestial objects and phenomena, astronomy contributes to our broader understanding of physics, chemistry, and the fundamental laws of nature.\nc. Expanding technological frontiers: Many technological advancements, such as satellite communication, weather forecasting, and GPS systems, have roots in astronomical research and exploration.\n\nMilestones and Breakthrough Discoveries:\na. Heliocentric model: Nicolaus Copernicus revolutionized our understanding of the solar system by proposing that the Earth and other planets orbit the Sun.\nb. Kepler\'s laws of planetary motion: Johannes Kepler\'s laws provided a mathematical description of how planets move around the Sun, laying the foundation for modern celestial mechanics\nc. Hubble\ns observations: Edwin Hubble\ns pioneering work in the early 20th century revealed the expansion of the universe and the existence of other galaxies beyond our Milky Way.\nd. Exoplanet discoveries: The detection of thousands of exoplanets orbiting distant stars has opened new avenues for understanding planetary systems and the potential for life beyond Earth.\n\nUnveiling the Cosmic Wonders:\na. Stellar nurseries and star formation: Astronomy unveils the birthplaces of stars, where vast clouds of gas and dust collapse under gravity, giving rise to new stars and planetary systems.\nb. Supernovae and stellar evolution: Exploring the life cycles of stars, from their fiery births to explosive deaths as supernovae, provides insights into the creation of heavy elements and the evolution of galaxies.\nc. Black holes and cosmic phenomena: Astronomy investigates the enigmatic nature of black holes, gravitational waves, pulsars, and other exotic phenomena that challenge our understanding of space and time.\n\nThe Search for Extraterrestrial Life:\na. SETI and the quest for intelligent life: The Search for Extraterrestrial Intelligence (SETI) employs various methods to detect potential signals from civilizations beyond Earth, fueling our curiosity about life in the universe.\nb. Habitability and exoplanets: Astronomers study the conditions necessary for life to thrive on other planets, examining the habitable zones and potential biosignatures of exoplanets.\n\nConclusion:\nAstronomy continues to inspire and amaze us, unraveling the mysteries of the universe and expanding our horizons. From ancient stargazers to modern-day astronomers, humanity\ns quest to understand the cosmos drives scientific progress and fuels our innate sense of wonder. Let us gaze at the night sky with awe, appreciating the beauty and complexity of the universe, as we strive to unlock its secrets and explore the boundless wonders that await us beyond our home planet.',
//     authorID: '64f0086923f43238c6b817cc',
//     preview: 'Astronomy, the study of celestial objects and the universe as a whole, has captivated humans since ancient times. From the twinkling stars in the night sky to the mind-boggling expanse of galaxies, astronomy offers a glimpse into the vastness and mysteries of the cosmos. In this blog post, we embark on a journey to explore the fascinating world of astronomy, delving into its importance, breakthrough discoveries, and the awe-inspiring wonders that await us beyond our Earthly home.'
// }, {
//     title: 'The Elixir of Life: Exploring the Wonders and Importance of Water',
//     content: 'Water, the essential compound that sustains all forms of life on our planet, is often taken for granted. From the vast oceans to the tiniest droplets, water is a remarkable substance with unique properties and an indispensable role in shaping our world. In this blog post, we dive deep into the wonders and importance of water, examining its significance for our bodies, environment, and the delicate balance of life on Earth.\n\nThe Foundation of Life:\na. The universal solvent: Water\'s ability to dissolve a wide range of substances allows it to transport vital nutrients and minerals throughout living organisms.\nb. The medium for biological processes: Water serves as the primary medium for chemical reactions, cellular processes, and the maintenance of homeostasis in all living organisms.\nc. Essential for reproduction and growth: Water plays a crucial role in reproduction, facilitating the development and growth of organisms from the embryonic stage to maturity.\n\nThe Mighty Hydrological Cycle:\na. Evaporation and condensation: The hydrological cycle, driven by solar energy, involves the evaporation of water from oceans, lakes, and rivers, followed by condensation into clouds.\nb. Precipitation and runoff: Rainfall and snowfall deliver water back to the Earth\'s surface, replenishing lakes, rivers, and groundwater reserves, ensuring the availability of water for various ecosystems and human needs.\nc. Transpiration and plant life: Through transpiration, plants release water vapor into the atmosphere, contributing to cloud formation and the overall balance of the hydrological cycle.\n\nWater and Environmental Balance:\na. Ecosystem support: Aquatic ecosystems, such as rivers, lakes, and oceans, provide habitats for diverse flora and fauna, playing a vital role in maintaining biodiversity and supporting intricate food webs.\nb. Climate regulation: Water bodies act as heat sinks, absorbing and releasing heat more slowly than land, helping to regulate local and global climates.\nc. Groundwater and wetlands: Underground reservoirs of water, along with wetlands, act as natural filters, purifying water and providing crucial habitats for numerous species.\n\nHuman Health and Well-being:\na. Hydration and bodily functions: Water is essential for maintaining proper hydration, aiding digestion, regulating body temperature, and ensuring the optimal functioning of organs and systems.\nb. Disease prevention: Access to clean and safe drinking water is critical for preventing waterborne diseases and promoting public health.\nc. Agriculture and food security: Water is vital for irrigation, crop growth, and livestock farming, playing a central role in ensuring food security for growing populations.\n\nConservation and Sustainable Practices:\na. Water scarcity and management: The increasing demand for water, combined with climate change and population growth, highlights the importance of water conservation and sustainable water management practices.\nb. Efficient water usage: Conserving water through efficient irrigation techniques, water recycling, and responsible personal consumption can help preserve this precious resource.\nc. Protecting water ecosystems: Preserving water bodies, reducing pollution, and safeguarding aquatic habitats are crucial for maintaining the health and integrity of our ecosystems.\n\nConclusion:\nWater\ns significance goes beyond its basic molecular structure. It sustains life, shapes our environment, and influences our well-being. Recognizing the wonders and importance of water prompts us to value and conserve this invaluable resource. Let us embrace responsible practices, advocate for sustainable water management, and cherish the elixir of life that connects all living beings on our beautiful blue planet.',
//     authorID: '64f0086923f43238c6b817cd',
//     preview: 'Water, the essential compound that sustains all forms of life on our planet, is often taken for granted. From the vast oceans to the tiniest droplets, water is a remarkable substance with unique properties and an indispensable role in shaping our world. In this blog post, we dive deep into the wonders and importance of water, examining its significance for our bodies, environment, and the delicate balance of life on Earth.'
// }, {
//     title: 'The Evolution of Computers: From Room-Sized Machines to Pocket-Sized Powerhouses',
//     content: 'The computer, a revolutionary invention of the 20th century, has transformed the way we live, work, and communicate. From its humble beginnings as room-sized machines to the sleek and powerful devices we carry in our pockets today, computers have undergone a remarkable evolution. In this blog post, we take a brief journey through time to explore the fascinating development of computers and their profound impact on society.\n\nThe birth of computers can be traced back to the mid-20th century when massive machines filled entire rooms. These early computers, such as the ENIAC and UNIVAC, were constructed using vacuum tubes and punch cards, requiring extensive manual programming and limited in their capabilities.\n\nAs technology advanced, so did the size and capabilities of computers. The advent of transistors in the late 1940s paved the way for smaller and more efficient machines, leading to the development of mainframe computers used by large organizations and institutions.\n\nThe 1970s witnessed a significant breakthrough with the introduction of the microprocessor, a single chip capable of performing complex calculations. This innovation marked the birth of personal computers (PCs), making computing accessible to individuals for the first time. Companies like Apple and IBM played pivotal roles in popularizing PCs, which rapidly evolved in terms of processing power, storage capacity, and user-friendly interfaces.\n\nThe 1990s brought further advancements, with the widespread adoption of graphical user interfaces (GUIs) and the emergence of the internet. These developments revolutionized the way we interacted with computers and opened up boundless opportunities for communication, information sharing, and e-commerce.\n\nFast forward to today, computers have become ubiquitous, with an array of devices ranging from powerful desktops and laptops to portable tablets and smartphones. The exponential growth of computing power, storage capabilities, and connectivity has enabled us to carry miniaturized supercomputers in our pockets, granting instant access to vast amounts of information and a multitude of applications.\n\nConclusion:\nThe evolution of computers over the past century has been nothing short of extraordinary. Starting from room-sized machines that required dedicated spaces, computers have become compact, versatile, and integral to our daily lives. As we move forward, the relentless progress of technology continues to shape the future of computing, promising even more powerful, interconnected, and intelligent devices that will redefine the way we work, communicate, and explore the world.',
//     authorID: '64f0086923f43238c6b817cd',
//     preview: 'The computer, a revolutionary invention of the 20th century, has transformed the way we live, work, and communicate. From its humble beginnings as room-sized machines to the sleek and powerful devices we carry in our pockets today, computers have undergone a remarkable evolution. In this blog post, we take a brief journey through time to explore the fascinating development of computers and their profound impact on society.'
// }, {
//     title: 'Mars: The Red Planet Beckons Humanity\'s Curiosity',
//     content: 'Mars, the fourth planet from the Sun and Earth\'s neighboring celestial body, has captivated human imagination for centuries. With its distinct reddish hue and intriguing similarities to our own planet, Mars has become a focal point of scientific exploration and a potential future home for humanity. In this blog post, we delve into the wonders of the Red Planet, its fascinating features, and the ongoing quest to unlock its secrets.\n\nMars, often referred to as the "Red Planet," derives its distinct color from iron oxide (rust) present on its surface. This terrestrial neighbor shares intriguing similarities with Earth, such as polar ice caps, seasonal weather patterns, and a day-night cycle close to 24 hours. These similarities have fueled deep curiosity about the possibility of life on Mars.\n\nExploration of Mars began with early telescopic observations, but it wasn\'t until the 20th century that spacecraft missions provided valuable insights. Mars rovers, such as NASA\'s Spirit, Opportunity, and Curiosity, have uncovered evidence of ancient water flows, suggesting that liquid water once existed on the planet\'s surface. This discovery has raised hopes for the potential habitability of Mars and the existence of microbial life.\n\nIn recent years, the focus has shifted towards future manned missions to Mars. Space agencies and private companies are actively working on ambitious plans to establish human colonies on the planet. The challenges are immense, including the need to develop advanced life support systems, overcome the harsh environment, and ensure long-term sustainability.\n\nMars also holds promise for scientific research. The planet\'s geology, climate, and atmosphere provide valuable insights into the history of our solar system and the possibility of past or present habitability beyond Earth. Scientists continue to study Mars to understand its unique characteristics and unravel the mysteries of its formation and evolution.\n\nConclusion:\nMars, with its captivating allure and potential for scientific breakthroughs, represents an extraordinary opportunity for human exploration and discovery. As our understanding of the Red Planet deepens through technological advancements and space missions, we inch closer to unraveling its secrets and perhaps even establishing a human presence on its surface. With each step, Mars beckons our curiosity and invites us to explore the unknown, expanding the boundaries of human knowledge and inspiring future generations to reach for the stars.',
//     authorID: '64f0086923f43238c6b817cc',
//     preview: 'Mars, the fourth planet from the Sun and Earth\'s neighboring celestial body, has captivated human imagination for centuries. With its distinct reddish hue and intriguing similarities to our own planet, Mars has become a focal point of scientific exploration and a potential future home for humanity. In this blog post, we delve into the wonders of the Red Planet, its fascinating features, and the ongoing quest to unlock its secrets.'
// }, {
//     title: 'Meet Assistant: Your AI-Powered Digital Companion',
//     content: '\nIntroduction:\nIn this rapidly advancing digital age, artificial intelligence (AI) has become an integral part of our lives. One such AI creation is Assistant, a state-of-the-art language model developed by OpenAI. With its vast knowledge and natural language processing capabilities, Assistant has revolutionized the way we interact with technology. In this blog post, we\'ll delve into the world of Assistant, exploring its capabilities, benefits, and potential applications.\n\nAssistant, powered by the GPT-3.5 architecture, is a cutting-edge language model designed to comprehend and generate human-like text. Trained on a diverse range of data, Assistant can assist users by answering questions, providing information, offering creative suggestions, and engaging in interactive conversations.\n\nOne of the key strengths of Assistant is its ability to adapt to various domains and contexts. Whether it\'s helping with research, providing writing assistance, or offering personalized recommendations, Assistant\'s versatility makes it a valuable tool for professionals, students, and individuals seeking reliable and intelligent support.\n\nThe benefits of Assistant extend beyond its ability to process and generate text. It serves as a powerful educational resource, enabling users to learn about diverse topics and access up-to-date information. Additionally, Assistant can foster creativity by generating ideas, assisting in content creation, and even providing feedback on written work.\n\nMoreover, Assistant\'s potential applications are vast. From customer support and virtual assistants to language translation and content generation, AI-powered models like Assistant are reshaping industries and enhancing efficiency. With further advancements, Assistant has the potential to revolutionize healthcare, finance, and other sectors where data-driven decision-making and personalized experiences are crucial.\n\nConclusion:\nAssistant, the AI-powered language model, represents a significant milestone in the field of artificial intelligence. Its ability to comprehend and generate human-like text has transformed the way we interact with technology, opening doors to new possibilities and enhancing productivity. As AI continues to evolve, Assistant and its successors will undoubtedly play a pivotal role in shaping the future, aiding us in our quest for knowledge, creativity, and efficiency.',
//     authorID: '64f0086923f43238c6b817cd',
//     preview: 'In this rapidly advancing digital age, artificial intelligence (AI) has become an integral part of our lives. One such AI creation is Assistant, a state-of-the-art language model developed by OpenAI. With its vast knowledge and natural language processing capabilities, Assistant has revolutionized the way we interact with technology. In this blog post, we\'ll delve into the world of Assistant, exploring its capabilities, benefits, and potential applications.'
// }]);
// }

module.exports = { GetBlogPage, GetSingleBlog, InsertBlog, UpdateBlog, DeleteBlog }