// Recommended playlist page
<template>
  <div
    class="playlists"
    ref="playlists"
  >
    <div
      class="top-play-list-card"
      v-if="topPlaylist.id"
    >
      <TopPlaylistCard
        :desc="topPlaylist.description"
        :id="topPlaylist.id"
        :img="topPlaylist.coverImgUrl"
        :name="topPlaylist.name"
      />
    </div>
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        @tabChange="onTabChange"
        align="right"
        type="small"
        v-model="activeTabIndex"
      />
    </div>
    <div class="playlist-cards">
      <PlaylistCard
        :desc="`Airplay：${$utils.formatNumber(item.playCount)}`"
        :id="item.id"
        :img="item.coverImgUrl"
        :key="item.id"
        :name="item.name"
        v-for="item in playlists"
      />
    </div>
    <Pagination
      :current-page.sync="currentPage"
      :page-size="PAGE_SIZE"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
    ></Pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPlaylists, getTopPlaylists } from "@/api"
import PlaylistCard from "@/components/playlist-card"
import TopPlaylistCard from "@/components/top-playlist-card"
import { getPageOffset, scrollInto } from "@/utils"

const PAGE_SIZE = 50
export default {
  async created() {
    this.PAGE_SIZE = PAGE_SIZE
    this.tabs = [
      "All",
      "European and American",
      "Chinese",
      "Pop",
      "Rap",
      "Rock",
      "Folk",
      "Electronic",
      "Light music",
      "Movie and TV soundtracks",
      "ACG",
      "Nostalgia",
      "Cure",
      "Travel"
    ]
    this.initData()
  },
  data() {
    return {
      activeTabIndex: 0,
      playlists: [],
      currentPage: 0,
      total: 0,
      topPlaylist: {}
    }
  },
  methods: {
    // Get playlists and specialty playlists
    async initData() {
      this.getPlaylists()
      this.getTopPlaylists()
    },
    async getPlaylists() {
      const { playlists, total } = await getPlaylists({
        limit: PAGE_SIZE,
        offset: getPageOffset(this.currentPage, PAGE_SIZE),
        cat: this.tabs[this.activeTabIndex]
      })
      this.playlists = playlists
      this.total = total
    },
    async getTopPlaylists() {
      const { playlists } = await getTopPlaylists({
        limit: 1,
        cat: this.tabs[this.activeTabIndex]
      })
      this.topPlaylist = playlists[0] || {}
    },
    // Page only retrieves the playlist
    async onPageChange(page) {
      this.currentPage = page
      this.getPlaylists()
      scrollInto(this.$refs.playlists)
    },
    onTabChange() {
      this.currentPage = 0
      this.initData()
    }
  },
  components: {
    TopPlaylistCard,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.playlists {
  padding: 12px;

  .top-play-list-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 36px;
  }
}
</style>
