<template>
    <div class="container-fluid row">
        <div class="col-4">
            <button class="btn btn-success btn-create" data-toggle="modal" data-target="#exampleModalCenter">Create
            </button>
            <div class="list-products">
                <h3>List Event</h3>
                <div class="product-table">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in events" :key="list.id">
                            <td>{{ list.title }}</td>
                            <td>{{ list.start }}</td>
                            <td>{{ list.end }}</td>
                            <td>{{ list.category }}</td>
                            <td>{{ list.detail }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <input type="text" v-model="calender.title" class="form-control title"
                                   placeholder="Add title">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12">
                                    <button class="btn btn-event btn-primary" v-model="calender.cate" value="event">
                                        Event
                                    </button>
                                    <button class="btn btn-reminder btn-light" v-model="calender.cate" value="reminder">
                                        Reminder
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Start Date</label>
                                        <input type="date" class="form-control" v-model="calender.start">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>End Date</label>
                                        <input type="date" class="form-control" v-model="calender.end">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Detail</label>
                                        <textarea rows="4" class="form-control" v-model="calender.detail"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-other">Other options</button>
                            <button type="button" @click="addEvent" class="btn btn-primary btn-save">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8">
            <Fullcalendar
                @eventClick="showEvent"
                :plugins="calendarPlugins"
                :header="{
               left: 'title',
               center: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
            }"
                :events="events"
            />
        </div>
    </div>
</template>

<script>
    require('@fullcalendar/core/main.min.css')
    require('@fullcalendar/daygrid/main.min.css')
    require('@fullcalendar/timegrid/main.min.css')

    import Fullcalendar from '@fullcalendar/vue'
    import DayGridPlugin from '@fullcalendar/daygrid'
    import TimeGridPlugin from '@fullcalendar/timegrid'
    import InteractionPlugin from '@fullcalendar/interaction'
    import ListPlugin from '@fullcalendar/list'
    import { mapGetters} from 'vuex'
    export default {
        name: "Home",
        components: {Fullcalendar},
        data() {
            return {
                calendarPlugins: [
                    DayGridPlugin,
                    TimeGridPlugin,
                    InteractionPlugin,
                    ListPlugin
                ],
                calender: {
                    title: '',
                    start: '',
                    end: '',
                    detail: '',
                    cate: 'event',
                }
            }
        },
        computed: {
          ...mapGetters(["events"])
        },
        created() {
            this.getEvents();
        },
        methods: {
            addEvent() {
                axios.post("/api/calendar", {
                    title: this.calender.title,
                    start: this.calender.start,
                    end: this.calender.end,
                    detail: this.calender.detail,
                    cate: this.calender.cate,
                    user_id: 1
                })
                    .then(data => {
                        this.getEvents();
                        //this.resetForm(); // clear newEvent properties (e.g. title, start_date and end_date)
                    })
                    .catch(err =>
                        console.log("Unable to add new event!", err.response.data)
                    );
            },
            showEvent(arg) {
                /* this.addingMode = false;*/
                const {id, title, start, end} = this.events.find(
                    event => event.id === +arg.event.id
                );
                /*this.indexToUpdate = id;*/
                /*this.newEvent = {
                    event_name: title,
                    start_date: start,
                    end_date: end
                };*/
            },
            getEvents() {
                axios
                    .get("/api/calendar")
                    .then(response => {
                       // this.events = response.data
                        this.$store.commit("ADD_EVENT",response.data)
                    })
                    .catch(err => console.log(err.response.data));
            },
        }
    }
</script>

<style scoped>
    .btn-create {
        border-radius: 2em;
    }

    .title {
        font-size: 22px;
        font-weight: bolder;
    }

    .btn-event {
        background-color: #e8f0fe;
        color: #1a73e8;
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        border: none;
    }

    .btn-event:hover {
        background-color: #cedffd;
    }

    .btn-reminder {
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        border: none;
        color: #5f6368;
    }

    .btn-save {
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
    }

    .btn-other {
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
    }

</style>
