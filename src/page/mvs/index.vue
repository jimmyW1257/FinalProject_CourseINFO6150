<template>
  <div
    class="mvs"
    ref="page"
  >
  <div class="tabs-wrap">
  <span class="tabs-type">Region:</span>
  <Tabs
    :tabs="areaTabs"
    class="tabs"
    type="split"
    v-model="activeAreaTabIndex"
  />
</div>
<div class="tabs-wrap">
  <span class="tabs-type">Type:</span>
  <Tabs
    :tabs="typeTabs"
    class="tabs"
    type="split"
    v-model="activeTypeTabIndex"
  />
</div>
<div class="tabs-wrap">
  <span class="tabs-type">Sort:</span>
  <Tabs
    :tabs="sortTabs"
    class="tabs"
    type="split"
    v-model="activeSortTabIndex"
  />
</div>

    <WithPagination
      :getData="getAllMvs"
      :getDataParams="getDataParams"
      :limit="40"
      :scrollTarget="this.$refs && this.$refs.page"
      :total="mvCount"
      @getDataSuccess="onGetMvs"
    >
      <ul class="list-wrap">
        <li
          :key="mv.id"
          class="list-item"
          v-for="mv in mvs"
        >
          <MvCard
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :playCount="mv.playCount"
          />
        </li>
      </ul>
    </WithPagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllMvs } from "@/api"
import MvCard from "@/components/mv-card"
import WithPagination from "@/components/with-pagination"

const areaTabs = ["All", "Mainland", "Hong Kong & Taiwan", "Europe & America", "Japan", "Korea"]
const typeTabs = ["All", "Official", "Original Sound", "Live", "NetEase Produced"]
const sortTabs = ["Fastest Rising", "Hottest", "Newest"]

export default {
  created() {
    this.areaTabs = areaTabs
    this.typeTabs = typeTabs
    this.sortTabs = sortTabs
    this.getAllMvs = getAllMvs
  },
  data() {
    return {
      mvs: [],
      mvCount: 0,
      activeAreaTabIndex: 0,
      activeTypeTabIndex: 0,
      activeSortTabIndex: 0
    }
  },
  methods: {
    onGetMvs({ data, count }) {
      this.mvs = data
      if (count) {
        this.mvCount = count
      }
    }
  },
  computed: {
    getDataParams() {
      return {
        area: areaTabs[this.activeAreaTabIndex],
        order: sortTabs[this.activeSortTabIndex],
        type: typeTabs[this.activeTypeTabIndex]
      }
    }
  },
  components: {
    WithPagination,
    MvCard
  }
}
</script>

<style lang="scss" scoped>
.mvs {
  padding: $page-padding;
  margin: auto;

  .tabs-wrap {
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    .tabs-type {
      font-size: $font-size-sm;
    }
  }

  @include list(25%);
}
</style>
