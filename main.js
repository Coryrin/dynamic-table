const app = new Vue({
    el: '#app',
    data: {
      dataset: {
          data: [],
          columns: [],
      },
    },
    created: function() {
        this.getData();
    },
    methods: {
        getData: async function() {
            const url = 'https://jsonplaceholder.typicode.com/posts';
            const response = await fetch(url);

            this.dataset.data = await response.json();

            this.setColumns();
        },
        setColumns: function() {
            const item = this.dataset.data[0] || undefined;
            
            if (!item) {
                return;
            }

            const columns = Object.keys(item);
            
            const formattedColumns = [];

            for (const column of columns) {
                formattedColumns.push(
                    {
                        columnName: column,
                        shouldShow: true
                    }
                );
            }

            this.dataset.columns = formattedColumns;
        },
        toggleVisibility: function(key) {
            if (!this.dataset.columns[key]) {
                return;
            }

            this.dataset.columns[key].shouldShow = !this.dataset.columns[key].shouldShow;
        }
    }
});