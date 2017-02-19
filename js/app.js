/*global Vue, toMarkdown */
var query = '';
var apiURL = '';

var bt = new Vue({
    el: '#forms',
    data: {
        auth: '',
        issues: null,
        issueList: [],
        language: 'Lang',
        category: 'Category',
        title: '',
        description: '',
        steps: [],
        newStepText: '',
        expected: '',
        revision: ''
    },
    //created: function () {
    //    "use strict";
    //   this.markdown();
    //},
    methods: {
        markdown: function () {
            "use strict";
            var x = document.getElementById("template").innerHTML;
            console.log(x);
            x = toMarkdown(x);
            document.getElementById("markdown").innerText = x;
        },
        add: function () {
            "use strict";
            if (this.newStepText) {
                this.steps.push(this.newStepText);
                //console.log(typeof(this.newStepText) +' '+ this.newStepText)
                this.newStepText = '';
            }
        },
        listIssues: function () {
            "use strict";
            query = this.title;
            apiURL = 'https://api.github.com/search/issues?q=' + query + '+user:Atlantiss+repo:BugTracker+is:open';
            var xhr = new XMLHttpRequest(),
                self = this,
                temp;
            self.issueList = []; //clear results
            xhr.open('GET', apiURL);

            xhr.onload = function () {
                self.issues = JSON.parse(xhr.responseText);
                var i;
                for (i = 0; i < 5; i += 1) {
                    //console.log(self.issues.items["0"].html_url);
                    if (self.issues.items[i] !== undefined) {
                        temp = {
                            'number': '#' + self.issues.items[i].number,
                            'link': self.issues.items[i].html_url,
                            'issueTitle': self.issues.items[i].title
                        };

                        //console.log(temp)
                        self.issueList.push(temp); //add new results

                    }
                }
                //console.log(typeof(self.issueList) +' '+ self.issueList);
            };
            xhr.send();

        }
    }
});


Vue.component('step-item', {
    template: '\
    <li>\
      {{ title }}\
      <button  type="button" class="btn btn-danger btn-xs" v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
});


Vue.component('issue-item', {
    template: '\
    <li>\
      {{ issue }}\
    </li>\
  ',
    props: ['issue']
});