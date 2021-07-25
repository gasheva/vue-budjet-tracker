export default {
    data() {
        return {
            page: +this.$route.query.page|| 1,
            pageSize: 2,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods:{
        setupPagination(allItems){
            //chunks
            while(allItems.length>this.pageSize){
                this.allItems.push(allItems.splice(0,this.pageSize));
            }
            if (allItems.length>0)this.allItems.push(allItems);

            this.pageCount = this.allItems.length;
            this.items = this.allItems[this.page-1]||this.allItems[0];
        },
        pageChangeHandler(page){
            this.$router.push(`${this.$route.path}?page=${page}`);
            this.items = this.allItems[page-1]||this.allItems[0];
        }
    }
}