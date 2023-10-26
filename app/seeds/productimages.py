from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_productimages():
    image1 = ProductImage(productId=1, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576419/71fTdweakrL_owbaxi.jpg")
    image2 = ProductImage(productId=2, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576476/shutterstock_1552062329-scaled_gy7hy0.jpg")
    image3 = ProductImage(productId=3,imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576588/its-a-fish_d4qey0.jpg")
    image4 = ProductImage(productId=4, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576616/202856_standard_8rBSzrY_t900x600_jburdl.jpg")
    image5 = ProductImage(productId=5, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576690/hamster-driving-car-jean-michel-labat_yzajc0.jpg")
    image6 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278650/Gator_Blades_1_fvyuxg.png")
    image7 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278649/Gator_Blades_2_rqsjh3.png")
    image8 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278649/Gator_Blades_6_jkhwdg.png")
    image9 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278649/Gator_Blades_4_jbvlrv.png")
    image10 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278649/Gator_Blades_3_oqtbds.png")
    image11 = ProductImage(productId=6, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278647/Gator_Blades_5_sj4m4l.png")
    image12 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278644/Gator_Hammock_1_bvl2d3.png")
    image13 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278643/Gator_Hammock_3_oav7rc.png")
    image14 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278643/Gator_Hammock_4_kjb9ez.png")
    image15 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278642/Gator_Hammock_2_oziuza.png")
    image16 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278641/Gator_Hammock_5_u78ttz.png")
    image17 = ProductImage(productId=7, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278640/Gator_Hammock_6_yxiwjt.png")
    image18 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278636/dog_bed_2_c40vr7.jpg")
    image19 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278636/dog_bed_1_xz6tcv.avif")
    image20 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278635/dog_bed_3_pq1im9.jpg")
    image21 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278636/dog_bed_4_avarwc.jpg")
    image22 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278635/dog_bed_5_urbqcg.jpg")
    image23 = ProductImage(productId=8, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/dog_bed_6_bxbiqm.jpg")
    image24 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/cat_post_polyvo.jpg")
    image25 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/cat_post_5_urejyz.jpg")
    image26 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/cat_post_2_jfbfo6.jpg")
    image27 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/cat_post_4_zkb1a4.jpg")
    image28 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278634/cat_post_3_brucar.jpg")
    image29 = ProductImage(productId=9, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278633/cat_post_6_v5wk46.jpg")
    image30 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278633/hamster_bed_1_i4hval.jpg")
    image31 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278633/hamster_bed_5_qpqbju.jpg")
    image32 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278633/hamster_bed_3_vxf46h.jpg")
    image33 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278632/hamster_bed_2_s3bwmn.jpg")
    image34 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278632/hamster_bed_4_n2pf1s.jpg")
    image35 = ProductImage(productId=10, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278632/hamster_bed_6_pezfk6.jpg")
    image36 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278631/dog_house_2_fyv5y0.avif")
    image37 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278631/dog_house_1_brqumc.avif")
    image38 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278631/dog_house_4_thlf3w.avif")
    image39 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278631/dog_house_3_g2meoz.avif")
    image40 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/dog_house_5_ek6lp6.avif")
    image41 = ProductImage(productId=11, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/dog_house_6_zvm1k5.avif")
    image42 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/dog_sweater_1_x4muds.avif")
    image43 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/dog_sweater_2_qoofii.avif")
    image44 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/dog_sweater_3_etcpi0.avif")
    image45 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/dog_sweater_4_gy0fec.avif")
    image46 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/dog_sweater_5_otcohc.avif")
    image47 = ProductImage(productId=12, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/dog_sweater_6_yvqgnw.avif")
    image48 = ProductImage(productId=13, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/Bird_conditioner_2_ehdjjv.webp")
    image49 = ProductImage(productId=13, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/Bird_conditioner_3_vuqhw5.webp")
    image50 = ProductImage(productId=13, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278630/Bird_conditioner_5_vphcgg.png")
    image51 = ProductImage(productId=13, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278629/Bird_conditioner_6_msur0q.webp")
    image52 = ProductImage(productId=13, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/Bird_conditioner_4_ds3uyq.webp")
    image53 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_3_qk4ytj.avif")
    image54 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_2_bkx11p.avif")
    image55 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_1_meoqtd.avif")
    image56 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_6_i7b52b.webp")
    image57 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_4_e2ltnm.jpg")
    image58 = ProductImage(productId=14, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278628/hamster_vitimins_5_ab2adr.avif")
    image60 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_1_nmj8pa.webp")
    image61 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_4_xv1apf.webp")
    image62 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_6_sdydwa.webp")
    image63 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_2_nerfu3.webp")
    image64 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_5_jgyucc.webp")
    image65 = ProductImage(productId=16, imgUrl="https://res.cloudinary.com/dj6kld6sh/image/upload/v1698278627/dog_collar_3_pdscvs.webp")


    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
                image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
                image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
                image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
                image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
                image51, image52, image53, image54, image55, image56, image57, image58, image60, image61,
                image62, image63, image64, image65]

    for image in images:
        db.session.add(image)



    db.session.commit()

def undo_productimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productsimages"))

    db.session.commit()
