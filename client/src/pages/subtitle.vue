<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center grey--text">
                <div class="display-1">Generate Pentecost Subtitles for Mobile app Users</div>
                <small class="caption">Here you can upload English Subtitles to generate subtitles  for users of the mobile apps 
                    as they watch Pentecost programmes. 
                    That is, while they watch Pentecost on their mobile app, they get the generated subtitle according to their peferred language.
                    On Regular Mode You must schedule the programmes on Pentecost and upload their english subtitle <code>SRT or XML</code>. <br/>
                    When you switch to Live Mode, Pentecost will use subtitles from the Scribe during the Live Service to display for mobile app users while watching Pentecost </small>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center mt-12">
                <v-icon  color="grey" size="100">mdi-hammer</v-icon>
                <div class="subtitle-1">Under Construction</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'default',
        data(){
            return {}
        }
    }
</script>
