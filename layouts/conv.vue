<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dark>
        <v-toolbar-title>
          <nuxt-link
            :to="localePath({ name: 'conv' })"
            style="text-decoration: none; color: white"
          >
            {{ $t('IIIF Converter') }}
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer />

        <v-menu offset-y>
          <template #activator="{ on }">
            <v-btn depressed color="primary" btn v-on="on">
              <v-icon class="mr-2">mdi-translate</v-icon>
              <template v-if="$vuetify.breakpoint.name != 'xs'">
                {{ langStr }}</template
              >
              <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-0">
      <v-container>
        <div class="text-center">
          <a
            href="https://github.com/nakamura196/i3/"
            style="color: white; text-decoration: none"
            ><v-icon>mdi-github</v-icon></a
          >
        </div>
      </v-container>
    </v-footer>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      large
      color="error"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <!-- v-scroll="onScroll" -->
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Layout extends Vue {
  fab: boolean = false
  drawer: boolean = false

  onScroll(e: any): void {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  toTop(): void {
    // this.$vuetify.goTo(0)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  items: any = process.env.jsonData

  baseUrl: string = process.env.BASE_URL || ''

  get langStr() {
    switch (this.$i18n.locale) {
      case 'ja':
        return '日本語'
      case 'en':
        return 'English'
    }
  }
}
</script>

<style>
.v-btn {
  text-transform: none !important;
}
table th {
  border: 1px solid #ddd;
}
table td {
  border: 1px solid #ddd;
}
</style>
