<template>
    <section id="team" class="team section-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Equipo</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>
  
        <div class="row">
          <div v-for="member in teamMembers" :key="member.id" class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" :data-aos-delay="member.delay">
              <div class="pic">
                <img :src="member.image" class="img-fluid" alt="">
              </div>
              <div class="member-info">
                <h4>{{ member.name }}</h4>
                <span>{{ member.role }}</span>
                <p>{{ member.description }}</p>
                <div class="social">
                  <a href=""><i class="ri-twitter-fill"></i></a>
                  <a href=""><i class="ri-facebook-fill"></i></a>
                  <a href=""><i class="ri-instagram-fill"></i></a>
                  <a href=""><i class="ri-linkedin-box-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'TeamSection',
    data() {
      return {
        teamMembers: [
          {
            id: 1,
            image: 'assets/img/team/team-1.jpg',
            name: 'Walter White',
            role: 'Chief Executive Officer',
            description: 'Explicabo voluptatem mollitia et repellat qui dolorum quasi',
            delay: 100
          },
          {
            id: 2,
            image: 'assets/img/team/team-2.jpg',
            name: 'Sarah Jhonson',
            role: 'Product Manager',
            description: 'Aut maiores voluptates amet et quis praesentium qui senda para',
            delay: 200
          },
          {
            id: 3,
            image: 'assets/img/team/team-3.jpg',
            name: 'William Anderson',
            role: 'CTO',
            description: 'Quisquam facilis cum velit laborum corrupti fuga rerum quia',
            delay: 300
          },
          {
            id: 4,
            image: 'assets/img/team/team-4.jpg',
            name: 'Amanda Jepson',
            role: 'Accountant',
            description: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
            delay: 400
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /*--------------------------------------------------------------
# Team
--------------------------------------------------------------*/
.team .member {
  position: relative;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 5px;
  background: #fff;
  transition: 0.5s;
}

.team .member .pic {
  overflow: hidden;
  width: 180px;
  border-radius: 50%;
}

.team .member .pic img {
  transition: ease-in-out 0.3s;
}

.team .member:hover {
  transform: translateY(-10px);
}

.team .member .member-info {
  padding-left: 30px;
}

.team .member h4 {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 20px;
  color: #37517e;
}

.team .member span {
  display: block;
  font-size: 15px;
  padding-bottom: 10px;
  position: relative;
  font-weight: 500;
}

.team .member span::after {
  content: '';
  position: absolute;
  display: block;
  width: 50px;
  height: 1px;
  background: #cbd6e9;
  bottom: 0;
  left: 0;
}

.team .member p {
  margin: 10px 0 0 0;
  font-size: 14px;
}

.team .member .social {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.team .member .social a {
  transition: ease-in-out 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 32px;
  height: 32px;
  background: #eff2f8;
}

.team .member .social a i {
  color: #37517e;
  font-size: 16px;
  margin: 0 2px;
}

.team .member .social a:hover {
  background: #47b2e4;
}

.team .member .social a:hover i {
  color: #fff;
}

.team .member .social a + a {
  margin-left: 8px;
}


  </style>
  