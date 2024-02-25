import React from "react";

function PersonalInfo() {
  return (
    <div>
      <div>
        <h2>Kişisel</h2>
        <img src="" alt="" />
      </div>
      <div>
        <label htmlFor="name">Ad</label>
        <input type="text" name="" id="name" />
        <label htmlFor="surname">Soyad</label>
        <input type="text" name="" id="surname" />
      </div>
      <div>
        <label htmlFor="idnum">T.C. Kimlik Numarası</label>
        <input type="text" name="" id="idnum" />
        <label htmlFor="gender">Cinsiyet</label>
        <input type="text" name="" id="gender" />
      </div>
      <div>
        <label htmlFor="academic-title">Akademik Ünvan</label>
        <input type="text" name="" id="academic-title" />
        <label htmlFor="email">E-Posta</label>
        <input type="email" name="" id="email" />
      </div>
      <div>
        <label htmlFor="birthdate">Doğum Tarihi</label>
        <input type="date" name="" id="birthdate" />
        <label htmlFor="blood-group">Kan Grubu</label>
        <input type="text" name="" id="blood-group" />
      </div>
      <div>
        <label htmlFor="phone">Telefon</label>
        <input type="text" name="" id="phone" />
        <label htmlFor="car-plate">Araç Plakası</label>
        <input type="text" name="" id="car-plate" />
      </div>
      <div>
        <label htmlFor="emergency-name">Acil Durumda Ulaşılacak Kişi</label>
        <input type="text" name="" id="emergency-name" />
        <label htmlFor="emergency-phone">
          Acil Durumda Ulaşılacak Kişi Tel
        </label>
        <input type="text" name="" id="emergency-phone" />
      </div>
      <div>
        <label htmlFor="address">İkametgah Adresi</label>
        <input type="text" name="" id="address" />
      </div>
    </div>
  );
}

export default PersonalInfo;
