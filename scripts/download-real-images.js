const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesToDownload = [
  // 1. Official Completion Certificates
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCUtXKs-x5NVFM1vDdQxGZI9Gc6Oabni7Rq88I09mw1RiVNuP7WAqJRneC6mWNzdFDeEs_ibW8EBDDQT8s_EmM3rq7l8RZuX5ioDKGgKXNrAyA3410xXbY4TUc7nmRZWkliBN-sAYHByRCUrf3FASiq_D7lZN-uXPTijRk3AEFKNJ2JK-MTACWTBJZHiyY9miElLcwcxUpkVJHzKFq4jH93Rd0qpwsaPZjBc0ta6JaxbIRhkbjBx79Vqfk_bFPoZUFAuU',
    dest: 'public/images/projects/cert_01_amaala.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSW6NjK_iYE7StEj1eO8t_adTbMHkdFwRgiegiyH5l3AWHFO4v1tc34PUEpuFx3PW-KHHvePuPVaBp2ixMRFWnr1AislZPva5lQjq9e68EjwbJ78aDpu-y9OY3mntWk2WVlLRC4UTznoqpZBSFC11Qp4AG7AF5OOAf1Ba0jYH3X2kXoqpqSngwW8h1imyWdSOV79Nbn0igXbafCoE1gwyG-vD4NPgjL-5l5grmDD7lvP-ERctNYWPf_Kt7Py-hoJv42Rk',
    dest: 'public/images/projects/cert_02_aljanahin.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDogQh7z4GC-cqm8LsC2vROJhwZVpmjNOXt74WevgluR5YlfS49BBJrjzE9EzBdRVTfwZxJo-wk2O0bP3I4w0QLyFBHSy4oE4G40ac9S5fvF01b33sz0Eo8y8SxrjQB92nLZmr4HwHb711a5lP_E7FpxF0sUXTZethmOT6BQpts493yA_TjPYWlgqQkRKEVCFqbyVUDATGE_yt2Tzk9IR1ElicRr90Z4Ea1PG6bAPI3yWU4q_oTY4H90ST3u3RrKzirP-4',
    dest: 'public/images/projects/cert_03_alnarjis.jpg'
  },

  // 2. Organization Chart
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4t5fufK2WuCfTzjDLUlDtm6XrCnM0dJsa4TRNXiKcXje1gv0OwwITaxrE-6ZUKf3A5QvcNli9dfM0bG0Tl5vq83yzLqfdxn-7topOPNbjwMUK8HcUAqmwmDmPfi6pll3Da-n4DMkPiYvneAItZ2gtxJ6nbH2kVJVF0u8qOThdlb_EnCPcisfKHzfdluQwbTxVJPXxc2F_JDXH121ruoy4J_8YlFSamnk2hiKUf8OpmswQ08szXgKxbDmo4ClxI5duCeQ',
    dest: 'public/images/about/org_chart_real.jpg'
  },

  // 3. Leadership
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB70UNw6nMcdBvJ_piS5c-4vPe-mLV9KevBk3CRGhqM2MNDZpsRhyjfFcGClbYjnwGEazNmadzjQ-PYc93I4VPFKrbt7Zwa9evXncS1edmE5iP_Jx0K6Sw5AN8xhbIHoFaoErDlLH3LUMhLi6jEyvm20KRjeXJglTCYf6R7_-sEI0A-dy3Y8YgusbU6_aBg6xpnyaJM6mPEDFepx7pnGDU5T3vuRGbpyDjz6hCl71_-QUzjaolQ4y0TXA93r8bGe7LDMqc',
    dest: 'public/images/leadership/mahmoud_alsheakh.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMrbQZMVvqDZ8mgSBCN7EfnmhNmNJXEZTyP70EHON_AA-7S6OP8xOwPZLBZcaZdBT6kkOIv_IcWWpKg9lZq8OOLdGBJrQxZt2mome9oRscYGm9YetjP8Y90In9G_7L3EU7gkU0L6Oe1DqTAOFYvyWFSGtRJmv25spRiU4V2CQMe8eDIVFSBLZsEBRInrwYwyzZobxzAPmMdYRyK978M-F2dkK1iWCvqS3GBOa24ePcdDjUb_8NOdC5bDZRGC7mps-RZdw',
    dest: 'public/images/leadership/mouayed_masoud.jpg'
  },

  // 4. Equipment
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPCCyuQQKWdeIBWxPBh27XyVVUDHHROT4ytyG3neXadu8i37wlXxZePzN3To5KSr1zBNBhSiVyLQX2OHBK3oMWncpbi0eTujuPNCHlqks7qcfwA_vXu0IhZ2-9LRkCMmS_fQmvPG2_ybf6JkempTvCx4sP_P0vZWW--2DCPJWyrGGQaFhq6CgUmb_YxXYj1lvnnk8X0ZMNbIJ_73QJY2HrN4nT3J09Em3U9faae3nLmODOUiRpQ0aZwiBVZA2oWSJTGKo',
    dest: 'public/images/equipment/ditch_witch_jt100.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvonH0tuOHbSYDDVpS4g1Z3CphvCmLI-Wp7aW8ma3BXkK3bUY9nDbA2SpPsRrL0Cdp20ziLssAM6nmL2YMC0SLKKhxehom1VG2yBTgWZyt8iL05I8n0pgCdowyuPZQaNRf6TibbRieUzMGm0HQaSmOXUYfbxphh4Ev90bfF4bbuj407jNLnAZtIJ8V0de7YlOwdAHngaleq-6HLdGGNuDjUITyXuMqZU9jCF2caTk3opHI3vi50gpbMnuQ75Nijh4ti_E',
    dest: 'public/images/equipment/drillto_zt75.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADxETvlpyoupU0mHs6r3mKKdA5pg-7DTloGy9NrQvhONtVHszOyfMLG70mbRNcb6jHkbTZyJ2iRAS7ljEnql5EoAhJOjOCAi_pc9eiV-zUyTW2NmV_W8aQS8bZhLsNWAc-mNUEXmj5DUWHBEuqEChK7XaG_zYEnPi-mQuYad421gIbDf2ixcQLIlp-LEJm6XmZo_qNVy51FttPbuH4z-IxVhgqqk64tPX807sI62GGWarAJGFWmgQYT7dWWHwK8mkNmqI',
    dest: 'public/images/equipment/zlconn_zl900a.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD37p0RznsSjk6Ed4EuppZyPqbrqK6WT9neXa58SyGPdVmijYPnY0dyFi3DMxrPH8ckbfNZH46hIWn4yObphLY-K6ErACFSGdg_nz_iVPje9wlvjt16LbwJrKgsPedxTZ-2YWEF7DBj4LosDVCVvTc6MUZoLkQIc_Q-AWjm1PGXX4KOrhW5lhNebU51xd8hn6Ujx3SPJrpBU4vosAE9yeXnKYFA5IHuCHUrDvYcpIMdMQFWWBQ49WO1Pz0gG-HEa4EWiFs',
    dest: 'public/images/equipment/zlconn_metal_plate.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtvpo9zEySD-aBKpOb_O9potaNj8c5u-_jnYOft-9UVOgpTv2yrCkwzNm2kchGnE7bPc7x-QjQtNjjufiONLRACZ784PVun5mowY-4qr5hFw4fbIPOo_0MmDL_LLa-k3CbFdv-53CBk8ei8HMilXoa5Gbt1njeT_xb7BaK-3SkWHqRAMQ7iEwcL-QS6PO5npA32UecV3CLUWoYUbvNOwfo_IsgjipNeedKHs7U1gzoyE8yVGhTdQnzQ90JTHerkpO_WTo',
    dest: 'public/images/equipment/rock_reamers.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoTmZoozArwrxC6VXZd7-R9NFW7M3JgFxU5UsvPJsx4DGChRBbMDfm9igBdkyCMM-BaVkCVLSkayE47D1F2XbD1MnYYY1wWsJH5XY_GFOP1zpsJAeEoTS2Wxd0HOPl6vGvW7ZtToezZwgm6-bHhRqUGZIk3C39xKRUzOGmuzZngtVVaO5i07hlWidMTWq5Ct3XcN1dTp-pgtDew0wPaRtvTJn1MZLUX5vCRNIi-x7a9l6kno6jxQ7oRebYgWfHNIRpOS4',
    dest: 'public/images/equipment/hdpe_butt_fusion.jpg'
  },

  // 5. ISO & Awards
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAqYpIP2NIuswh9s8tYpwcxeLZPPtwvttZRIMDHug5RJhS3r9wx-1hGuUkdCobBrgWTKgXkdjrsGTFOOP8zPkfJ20xgTkYpodKdEfoMhSZFnpW_OUt2KYYcixFffQn-oelom-xOqlUoyy3z6YKfyGOgm_F4nLHNPBJOPfBr5NasiIlBtMJuD13NnBs8qkCNLws9dZ1GoSV68UvY0P1BYnR_JRXv6z9PEIP2huHk0VHa8pcgJsichDvP-Rtvs2Uj0oZ10Y',
    dest: 'public/images/certifications/iso9001_real.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlTrvdItu73yXmzi_opDtkTdadstzvracqWlyI3L5IeKKmO131k3U69dFOXJdfrzaN3Yg20OZ1jvOMfWShAMLM3_GQGd2K1ZMcpXMv8s4QGOs-UaXM9EIaGNaHHAwRxwgCDycd5BaULPMXOOESX67uDS_zBXuSyM88oFGbSvpa0DiFOpdNgJR9eVYj2VIXRYZbgTDvDDgUBaxr-X6-bmnMIanJB6bTpZhKMW6ABKaqnjJuVAsAtPAtw53m0kIkhlfvcNk',
    dest: 'public/images/certifications/iso14001_real.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACvrYPKGS6dTwP2WAPIPADLUTwTS76xYMFryvyLcxtHT72bYM8qUXL1r8lyqypKjKIQSBZjdRhCi7GqD_t3P4GI_2DfoSC29oUWcuJCIHhgZNWb2WSXMNXm6tA_bANbJox4P9d1UONv5PFRtu5ToM-5X5BLXRn91I8kYXurEJWS1GhGc4cX9gPS7cLqCR5JJ0fG-sEY7ZVdWY3t_vZfvrpJCE3c6hIWkcCzmwN2QYdM4XN0jWOl592iODBnLRqt48wmnM',
    dest: 'public/images/certifications/iso45001_real.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5VR-K8rrPqItFmQjdAd2UZY75j5FBcL_6Le7pmVKbiLgIWhAqNrOGcmAHGg0gyCuQsxiiNXiLAGK4ILfWQtkZSXyljOJOCh_d05v7R09LoDkaJRPGUaDYvL322f8STgybMtYohEe18CqnVhC0bi7-hn_WdXhpDs25T55ZPgxNQIUrvQ-q0_G_EqBrN5bvJTSZ1zbF2s0O1OokU_gBfBsTawwr0XiETQIRH5S44-k0v-ig-Y0yaI-4zHxNTgZY0jJl_xI',
    dest: 'public/images/certifications/kent_aramco_award.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkSp7neZDvoHJ9K92x9GrTj2fWevVvwaZrckr7Xs-WBWSeFSVt1PisUJabcd_mpvtytFjh89QagMscbgQkvu7g4IUEnFzhHjbPnnzA7m3xyK0fcJNnAkEQ5EqQ0Ws_9AgDWcBITf73mPM_euVHIm5AbTJy_GCQjhvpERLANPBAMePdE2uCM7FMAFev19S6NYm3aICxJrerWghIQT4gshIRLakXoj27iOfWgAygyNB4edKo8MipLRVHKD1OwgOY9a7a-tc',
    dest: 'public/images/certifications/aramco_ptw.jpg'
  },

  // 6. Statutory Credentials
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwmQJAI7VAuOoxas0i4wJrOCRhkIfxaLMJ7D__6D5iMWp0kN7k3_CqukldBzp7UH_cGhLdhxb32Fcg5DrLS31sjaWwQN35kKy19V4Q_0E9PVwzknlQmlyzHvSWpie3_HJfMATIH8EGSpuKJEY5Ju-Mm19Vn9d_hlWiaJ31ZmwdQNwjB3s7DL7OeY1fHDYSjyQfRzCM89sk5_58TPuYUk26JQiG6y7mM8773BIUs5Bfv-4N-rvwEIUIYh6O7D8LGyMNINc',
    dest: 'public/images/certifications/cr_document.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAueg_6aIhtsSiHBf0cDqL4238eNZgaKJkL1-1XDuoDlmOddsUhqSMalQWvmtUVr7Vqr7xoC7YBJISi2N2kjplrO6jm_2H-LwzybuRIiGa-AULpZJNUTzLDUPIKZicG4xHwWv8eMPg3ZZUfksqDtwWgA7W5OeYnKkU_tI07636iCoDhQMGrXlBC891T1Axg3KFrnBuRX3dF8AAev_BRX8L1WvRETgwe82Tlzh6DPqNreMYPYbWQ7mQae8RMhzpx9gQ9bm0',
    dest: 'public/images/certifications/vat_certificate.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAml0F1GZpvN3UnHG7RYiGtQBDrMGshXcLw5pN_AVj34lASgEhgtBq90rcLMkfuSmzhOOAVkxD5VgQC31OH2qqBkLojwV-MmuwfIWcVuP9CbxUAdpRk51wfHiyHGi5etHyKnpSMtsn_83M_ceBw185CllyjPtQVT52ysxJfzfpRFABXH06HX-guKoYTNp6_G5MC0hswaNmu6Ns1gbIszYU0Ufu8TBYTboSTR4GISHHlvs2w7io09QDln14S5LGM6OtAgIc',
    dest: 'public/images/certifications/national_address.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvviFfYgI1x4glhIWKks0bJJnBDBGUnDlMc_961IioWAxV3NZ9J6fyvXoaQFN0GjUGECSXEH1MgqPJVk--kRklzrq3I0Z6HNAL6JYjENaZDHd-1h9QFbc8Gvnw9afF_x6sajwgIMYvrar8Fe6LG73sC_jxsPuFAycUdKx0KHE1dSQJZb-9gH1W6RD9yFKthnQefF6nPk76xXB3VDzs-A2VEspaHhvIRsRjs8DED8UATAMblTDyc_ZuJJVPJc8G_JGdZgY',
    dest: 'public/images/certifications/gosi_certificate.jpg'
  },

  // 7. Articles & Qualification Deeds
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhezwq7lkF74ZubWq3B-3_rRdfLMt6p-PZHasa8gt_reUuelaGglEGbNFWkzhTjGEf-y-qK1PXP-PyloUtxXKmsVaseW76VaFm-PrLc2vgWwUtWzl5MUmaPO2nEVNJDSECviMGHEVJuX9IlVSjtnJ-Z525buYySNNfPxweFU0RTLqAFP5LEjoQ8VrVwo4e44a0jmzApzJ2gt8UmBS730Z-1Pi4MnPcpQu0r5dyAu5FRRXJvo-lyqFXY9Ynw5E97_aNKjk',
    dest: 'public/images/certifications/articles_cover.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIyUxtWvRtcELElPic5pXtGd7cI9f5iKmqOMiqfEFO-iEly7cpQX4Evup1_7CXxLSoxJKH6q_B91Ec1yA7jPzLsWEX8s5KPLOb2goj0YmN79cMy-q1RgdnR4r4afGZFnySOlplW1CyAybF0KMtWBa-lVzduaD9BAMJ3pkifaK5uQem6q79BgwBq8v9zvJILTlSM0DbQtGU_E1OEZwGdwb0CKW4KRhsfmvJogyHBt3gnnhFM_ezB9dfXfAEFedAEf6Pn8E',
    dest: 'public/images/certifications/articles_capital.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFDBdMT68Of3WggBGRSBERRalHGZkHEBSQh-S3kCnR5gor-e36OPhMlFDk32EmECZF44xbQDkpNSpmU-l1GiJu8ZB5McQASiqy9bzD8i0mqMErIsl32WzanIp6zRodUrkd0_j9uk-r1znMP4d21S2KJm2ljeJh0r2pbD8wdcsZxQLJHxAmBwjDMiIQK7eFKqmGELpHJKeyo2e9f4Xs3a9ttWmpxADGRqd_jHF2xnhntePY6K5qBpo0o6Cd5xecAtmGEas',
    dest: 'public/images/certifications/articles_powers.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDADVub3XSBTHYtnplypLXPYolBvLwXX-_XlwrQj3GEmvaL9hfjmAde_KiqnBnrRfo7dQUa0nv2sxO5FxJENEuqxomm0o6duVuuNhao-08-Z0dNQzBvDwQLUIt9RLT2Vp3j6RbFPx0RIUwDtC5VSF4Yp-2RF1ojpGZxt4EcDOUQBC-Az49m1QAF_hmYMPJfJPFo4-7rlGRsm_f5TFZprUH1sK6igLsLcUnp97JfTzX2Z8rzcFuYe94NQ3i_3KmJ4wJASc',
    dest: 'public/images/certifications/articles_partner.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjTQtiMH7NDc47kwrnBhMgIDzG0qig_CYdoF5GWjaEcBYRrCqL8JTjhgKDSzi1Cxe04FdTToJL6ZJxYDIWETaod9dRa9jHCSSIk_WJ2_K2Y3d3ogCn5HKSBfVqzHP-jbRLFeniYJUn3HauGqOUoEWeCztQ_U6qIal1614tibh8O3H1pS-0IaHx45fkNbgb5gheFbUaiWCAOKSn02evPx_bl6vKjNw84AB-enNHifvgAGss6FJkDHR6IBVx1QZf3ads06U',
    dest: 'public/images/certifications/articles_activities.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBia2Z9UnVpAVkMXdHo8SesIJ8S7V_UyP3qP9klkGhhQth-zUylOmdT6oXYC372d1z9U9QEbzeS7cBL1kUBFuWG5038Ujwp_EECilRhlSxdhfrNIODJlIRk8MuqSrVZzhbWciIRI6d-uE5lWAz896MfuycOrpnRbnvL9w3MVqoTNMLFVPwmX0xI1hQ5hbXlBQQKRhMJqslj_B8X_opQvO-OKBkpMntZGI_0TWB-6PJPH_O-JFKJlANIX3N9iGt16njnCmU',
    dest: 'public/images/certifications/vermeer_cert.jpg'
  },

  // 8. Schematics
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5CJiw8USNa32DcvIXROQ45riiZjAb-aEMW_XaoZp5rF8oxOzDynpYVm9Q0lyMKRMikQegYdfnCC__A4X-tRhtRdhmSzrK3NY3KLR9Ea7g-u2nVfk29NOVWKDDq_mgPmJxP0uZXQt-LnNqeVLHoHj8lpDau8Gw2EVEZhfznAvk6MRNbWb3HR94oMqPaadDE4dELp5f7IRn4dymSKW__FT78sF0KZxTo5TWBCHAS5ljSxSkQaTLTyWl5HQ7S6DeRXp9tk',
    dest: 'public/images/schematics/saudconsult_sketch.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDABUiMfTw0zqZOxjb-Tch6TeC1QWVZF-XB0UDVfMEiO4ecN6x9lh7YAPZ_jmb1dKy32pYT_uTPXXJ2qYMvQCpLCQVALH6Tot24OJAWJ3D0cW2NzJ4mTBKzBuRu74c_L6z0f6S2AqO8snWqcLTlHb7ikBIXfITfC3YArKkhL9GNZZcHCay75g6LWMQYUj3pcBBwlMQ6qp3Fcr5GwpqsAKQaNHsR5Frx41njmUENeX_gtFLqojD37znvnf1RTgXyN2RFVcU',
    dest: 'public/images/schematics/section_aa.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZK0v5s47hgNAjwBslBLkQRdvNETkZwScbz17ns0XwOXHoLVTLNSJvMJkGzeu48imq1joYoou0er1ZmakhUZD0REXJlngvzBuSOWS9YeQ4kDyhxWA454TgFKGF5Eyua1VmINr-jJn74wioOIct7SsY4QGTQ0H8PMdFADTr0aPNxvzHO0Lphx6Z_1CMfNXS1wvl9Sk0cPxUwbTUuWu6fL8Q2BEp7BhRHLYJzQWysgpB6Iqj7hm3MSpSMWDSsTBJPSaocxs',
    dest: 'public/images/schematics/depth_telemetry.jpg'
  },

  // 9. Field Operations
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnPldWt5q2ix9iyifjYbuh4-iririDKL5Pj6-hOO6gUkDdzqvSTA_pAcKltGT5hh9X2rSLw2AWJnxkOLm7N9Rarfp5bi1SJsuhAxjXtm4p9CRbnYoTyx99PmOeiSCVAR7t8ziqxZ7-PtP13T9KxbvZFHBy9CQiwDp-K6IKMtm_SVEdpbKN5tR4wCJ_-WDFy6jtU02NACFR0n2T8f0lbB7bAjwIdvrP43CxZHNU2dyju7_hsKqijycBL6sQynuNvcB-SI',
    dest: 'public/images/projects/field_42inch_reamer.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-vP95x57M1tZsqSuRoqtUOzhjlNsO--cd3sjxfSyzCwZ60V2yuH7MSN4iDNNRee9JpRUhehMmC6mJ3s2kiFwkQKPOGomQL3cs3Qa9rDUFxwEsXriSmHhb-s4CtCyFUKECvo9gRYYa_8eJeVfsF-4cYdPHoPOao_htT7FwttPU_vmNd1X0m3BXsyy8uAwRHjeLNm0KAUUuHp6bVGvQeHe4JWG-WS0xf9aFKrBi7GVvNQ3fGSe5HpKxVYpIL-JXfApwPrw',
    dest: 'public/images/projects/field_315mm_welding.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwiOgsp-suEG7HtDswY6WCRmoRmH4r1ZNGhXQkH1uHpWAb8vplXlESModXfnPlrGtfZCbpbVUAVMmD2OUHYloMKdrpFLrD6Bi49b_05s9YeTY27csy7nIidnAE6RQp1NJDZObt6q08gd7XzF0GanzQNKaZ214Q6kxBwpKiQOm6ts9GmCzcJZcU8xICPunYKOmtgPsZiaf9ZM7tctNjhFLiQs65c6WIdCMDLTEqdtLo6mPKrotaxarB5WFngsolpCHk-1c',
    dest: 'public/images/projects/field_neom_amaala.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCByv35W4AUbgLmFWecoBNKEagWhtvQlcE_79u98bfQMevaEqiHUP1IVck4nv7NtaQovJBzUofZEvgBib-nC8fr_xaG4Ydvm34T7LgZdRXQmKVd55VDwO3bps696S9pwXIzZRlpf_9Fms7MEGFfh_bro3OyYIaUVI4Jt-6c5xBfa9jDbHe95Mhq1ODJOS49LaaH1ehW8t6-FhCWdy8sRuzclWEC1o3CVXAJr5ZMVQ3Y81HEgbPu6N-s4tFgyuw4I-F3SJg',
    dest: 'public/images/projects/field_client_inspection.jpg'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(process.cwd(), dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(fullPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${imagesToDownload.length} official images...`);
  for (const item of imagesToDownload) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`[OK] Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`[ERR] Failed: ${item.dest} - ${err.message}`);
    }
  }
  console.log('Finished downloading all real official images.');
}

run();
