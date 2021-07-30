/* eslint-disable no-unreachable */ /* eslint-disable no-unreachable */ /*
eslint-disable no-unreachable */
<template>
  <div class="home">
    <v-container>
      <v-col md="10">
        <div class="filter_header">
          <v-col md="6">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              hide-slider
              left
            >
              <v-tab v-for="item in tablist" :key="item" color="pink">
                {{ item }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col md="3">
            <v-select
              v-if="tab === 0"
              @change="Mactchfilter('type')"
              v-model="stype"
              hide-details="auto"
              :items="Types"
              item-text="title"
              outlined
            ></v-select>
          </v-col>
          <v-col md="3">
            <v-select
              v-if="tab === 0"
              v-model="team"
              @change="Mactchfilter('team')"
              hide-details="auto"
              :items="teams"
              item-text="team"
              item-value="id"
              outlined
            ></v-select>
          </v-col>
        </div>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <table class="table-live">
              <tbody>
                <div
                  class="live-row"
                  v-for="score in filteredLive"
                  :key="'score_' + score.match_id"
                >
                  <tr class="liveup">
                    <td colspan="8">
                      <p>
                        {{ score.venue.name }}
                        <br />

                        {{
                          $moment(score.date_start)
                            .utc()
                            .utcOffset(score.venue.timezone)
                            .format("DD MMM, YY")
                        }}
                        Local Time
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="upcoming">
                        <h2>
                          <span>Live</span>
                          {{ subtitle(score.subtitle) }}
                        </h2>
                      </div>
                    </td>
                    <td>
                      <div class="score-content left">
                        <h4 class="team-name">
                          {{ score.teama.name }}
                        </h4>
                        <p>{{ score.teama.scores_full }}</p>
                      </div>
                    </td>
                    <td>
                      <img
                        :src="score.teama.logo_url"
                        class=""
                        itemprop="image"
                      />
                    </td>
                    <td>
                      <h1 class="upcoming-h1">
                        VS
                      </h1>
                    </td>
                    <td>
                      <img
                        :src="score.teamb.logo_url"
                        class=""
                        itemprop="image"
                      />
                    </td>
                    <td>
                      <div class="score-content right">
                        <h4 class="team-name">
                          {{ score.teamb.name }}
                        </h4>
                        <p>{{ score.teamb.scores_full }}</p>
                      </div>
                    </td>
                    <td>
                      <p class="upcoming-date">
                        {{
                          $moment(score.date_start)
                            .utc()
                            .utcOffset(score.venue.timezone)
                            .format("h:mm A")
                        }}
                      </p>
                    </td>
                  </tr>
                </div>

                <div
                  class="upcoming-row"
                  v-for="score in filteredList"
                  :key="'score_' + score.match_id"
                >
                  <tr class="liveup">
                    <td colspan="8">
                      <p>
                        {{ score.venue.name }}
                        <br />

                        {{
                          $moment(score.date_start)
                            .utc()
                            .utcOffset(score.venue.timezone)
                            .format("DD MMM, YY")
                        }}
                        Local Time
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="upcoming">
                        <h2>
                          <span>Upcoming</span>
                          {{ subtitle(score.subtitle) }}
                        </h2>
                      </div>
                    </td>
                    <td>
                      <div class="score-content left">
                        <h4 class="team-name">
                          {{ score.teama.name }}
                        </h4>
                      </div>
                    </td>
                    <td>
                      <img
                        :src="score.teama.logo_url"
                        class=""
                        itemprop="image"
                      />
                    </td>
                    <td>
                      <h1 class="upcoming-h1">
                        VS
                      </h1>
                    </td>
                    <td>
                      <img
                        :src="score.teamb.logo_url"
                        class=""
                        itemprop="image"
                      />
                    </td>
                    <td>
                      <div class="score-content right">
                        <h4 class="team-name">
                          {{ score.teamb.name }}
                        </h4>
                      </div>
                    </td>
                    <td>
                      <p class="upcoming-date">
                        {{
                          $moment(score.date_start)
                            .utc()
                            .utcOffset(score.venue.timezone)
                            .format("h:mm A")
                        }}
                      </p>
                    </td>
                  </tr>
                </div>
              </tbody>
            </table>
            <v-col md="12" class="text-center">
              <v-pagination
                v-model="page"
                @input="Pagination(page)"
                :total-visible="5"
                class="my-4"
                circle
                :length="total_pages"
              ></v-pagination>
            </v-col>
          </v-tab-item>
          <v-tab-item class="text-center ">
            <v-card>
              <v-card-text>
                <p class="text-h4 text--primary">
                  not available
                </p>
                <p>adjective</p>
                <div class="text--primary">
                  Next Time
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4">
                  Load More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    tab: 0,
    page: 1,
    team: 0,

    stype: "0",
    Types: [
      { title: "Type", value: "2" },
      { title: "International", value: "0" },
      { title: "Domestic", value: "1" },
    ],
    tablist: ["Live & Upcoming", "Result"],
    teams: [
      { team: " Select Country", id: 0 },
      { team: "Afghanistan", id: 498 },
      { team: "Bangladesh", id: 23 },
      { team: "Australia", id: 5 },
      { team: "England", id: 490 },
      { team: "India", id: 25 },
      { team: "Ireland", id: 11 },
      { team: "Pakistan", id: 13 },
      { team: "South Africa", id: 19 },
      { team: "Sri Lanka", id: 21 },
      { team: "West Indies", id: 17 },
      { team: "Zimbabwe", id: 493 },
      { team: "Scotland", id: 9 },
      { team: "Netherlands", id: 1824 },
      { team: "Kenya", id: 9160 },
      { team: "Fiji", id: 9140 },
      { team: "Namibia", id: 10798 },
      { team: "Nepal", id: 10814 },
      { team: "Hong Kong", id: 1544 },
      { team: "Oman", id: 1546 },
      { team: "Canada", id: 6791 },
      { team: "United Arab Emirates", id: 15 },
    ],
    timer: "",
  }),
  computed: {
    ...mapState("scores", ["scores", "lives", "page_num", "total_pages"]),

    filteredList() {
      let tamaprry = [];

      tamaprry = this.scores.filter((score) => {
        if (this.stype == "2") {
          return score;
        }
        if (score.domestic === this.stype) {
          return score;
        }
      });
      if (this.team != 0) {
        const tamap = [];
        this.scores.forEach((element) => {
          if (
            element.teama.team_id === this.team ||
            element.teamb.team_id === this.team
          ) {
            tamap.push(element);
          }
        });
        tamaprry = tamap;
      }
      return tamaprry;
    },
    filteredLive() {
      let tamaprry = [];

      tamaprry = this.lives.filter((score) => {
        if (this.stype == "2") {
          return score;
        }
        if (score.domestic === this.stype) {
          return score;
        }
      });
      if (this.team != 0) {
        const tamap = [];
        this.lives.forEach((element) => {
          if (
            element.teama.team_id === this.team ||
            element.teamb.team_id === this.team
          ) {
            tamap.push(element);
          }
        });
        tamaprry = tamap;
      }
      return tamaprry;
    },
  },

  created() {
    this.ScoreData();
    this.ScoreLive();
    setInterval(
      function() {
         this.$store.dispatch("scores/ScoreData", false);
         this.$store.dispatch("scores/ScoreLive", false);
       
      }.bind(this),
      10000
    );
  },
  methods: {
    ...mapActions("scores", ["ScoreData", "ScoreLive"]),
    subtitle(value) {
      let subtitle = "";
      const withoutNumbers = value.replace(/\d+/g, "");
      if (withoutNumbers == "Match ") {
        subtitle = withoutNumbers;
      } else {
        subtitle = value;
      }
      return subtitle;
    },
    Mactchfilter(value) {
      this.Pagination(1)
      if (value == "type") {
        this.team = 0;
      }
      if (value == "team") {
        this.stype = "2";
      }
    },
    Pagination(page) {
    
      this.$store.dispatch("scores/Pagination", page);
      this.page = page
    },
  },
};
</script>
<style scoped>
.home {
  height: auto;
  min-height: 100vh;
  max-height: 100%;
}
</style>
