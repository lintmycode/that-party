<script setup>
import { ref, onMounted } from 'vue'

const scriptLoaded = ref(false)
const destination = { lat: 41.781351, lng: -8.8617906 }

const initMap = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.781351, lng: -8.845 },
    zoom: 14,
    mapTypeControl: false,
    mapId: import.meta.env.VITE_API_GMAPID
  })

  new window.google.maps.Marker({
    map: map,
    position: destination
  })
}

const loadGMapsScript = () => {
  // Define the callback function globally
  window.initMap = initMap

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${
    import.meta.env.VITE_API_GMAPS
  }&callback=initMap`
  script.async = true
  script.defer = true
  document.body.appendChild(script)

  script.onload = () => {
    scriptLoaded.value = true
  }
}

onMounted(async () => {
  if (typeof window.google === 'undefined') {
    loadGMapsScript()
  } else {
    scriptLoaded.value = true
    initMap() // Ensure the map is initialized if the script is already loaded.
  }
})
</script>

<template>
  <section>
    <div id="map"></div>
    <div class="content">
      <h2>Monte de Santo António</h2>
      <p>Estrada de Santo António 160, 4900-012 Afife</p>
      <p>GPS: {{ destination.lat }}, {{ destination.lng }}</p>
      <a
        :href="`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`"
        target="_blank"
        ><i>Como chegar</i> -&gt;</a
      >
      <br />
      <a
        href="https://www.booking.com/searchresults.pt-pt.html?ss=Afife%2C+Regi%C3%A3o+do+Norte%2C+Portugal&label=pt-pt-booking-desktop-dI1M0QVmAjqhgb5bsivrqAS652828998886%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1427534005%3Alp1011709%3Ali%3Adec%3Adm&aid=2311236&lang=pt-pt&sb=1&src_elem=sb&src=index&dest_id=-2157112&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=pt&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=c55a6c879b64010f&ac_meta=GhBjNTVhNmM4NzliNjQwMTBmIAAoATICcHQ6BWFmaWZlQABKAFAA&checkin=2023-09-16&checkout=2023-09-17&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure"
        target="_blank"
        ><i>Onde ficar</i> -&gt;</a
      >
    </div>
    <!-- Map and Location Details: Embed a Google Maps (or any map service) location of the park and provide any necessary details for finding the specific spot within the park. Also, include information about parking and public transportation options if available. -->
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 0;

  #map {
    z-index: 0;
    position: relative;
    height: 100%;
  }

  .content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10vw;
    width: 55rem;
    padding: 3rem 2rem;
    background-color: var(--color-background);
    z-index: 1;
    box-shadow: 1rem 1rem 0 0 var(--color-primary);

    @media (max-width: 1200px) {
      top: 80%;
    }

    @media (max-width: 768px) {
      top: auto;
      left: 0;
      bottom: 0;
      transform: none;
      width: 100%;
      box-shadow: 0 1rem 0 0 var(--color-primary);
    }

    h2 {
      font-size: 3rem;
      font-weight: 700;
    }

    p,
    a {
      font-size: 2rem;
    }

    a {
      text-decoration: none;

      i {
        text-decoration: underline;
        text-decoration-thickness: 0.4rem;
        font-weight: 700;
      }
    }
  }
}
</style>
