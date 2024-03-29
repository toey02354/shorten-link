# Demo App

[https://pants-sea-lion.cyclic.app/](https://fancy-ruby-dibbler.cyclic.app/)

ลูกเล่นที่เพิ่มเข้ามาคือ หาก url มีใน database อยู่แล้ว  
จะส่ง shortUrl ที่มีอยู่แล้วไปให้ (จะไม่สร้าง record ใหม่)

# Tech Stack

## Front-end

### React Typescript

เนื่องจาก React เหมาะกับโปรเจคในทุกขนาดไม่ว่าจะเป็นเล็ก กลาง หรือใหญ่  
และโปรเจคนี้มีขนาดเล็ก จึงเลือกใช้ React เพราะสามารถพัฒนาได้ง่ายและมีขนาดเล็ก

## Back-end

### NodeJS ExpressJS

เหตุผลเช่นเดียวกันกับ Frontend, โปเจคนี้มีขนาดเล็กจึงเลือกใช้ ExpressJS  
ซึ่งมีขนาดเล็ก และสามารถพัฒนาได้รวดเร็ว

## Database

### MongoDB

เนื่องจากระบบการย่อ Url ไม่ได้จำเป็นต้องสร้าง relationship จึงเลืิอกใช้ NoSQL Database  
MongoDB จึงตอบโจทย์เพราะมีให้ใช้งานได้ฟรีและเครื่องมือมากกว่า NoSQL ตัวอื่น

## Deployment

### Cyclic.sh

เหตุผลที่เลือก Cyclic.sh เพราะสามารถ deploy nodejs ได้ฟรีและ  
สามารถเชื่อมกับ github repo ได้โดยตรง แถมยังมีการ auto deploy เมื่อเรา push code ขึ้นไป github
