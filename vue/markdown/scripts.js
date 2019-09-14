// 定义日期时间过滤器
Vue.filter('datetime', time => moment(time).format("YYYY-MM-DD HH:mm:ss"));

new Vue({
    el: "#notebook",
    data() {
        return {
            // 笔记数组
            notes: JSON.parse(localStorage.getItem("notes")) || [],
            // 笔记内容
            content: "",
            // 被选中笔记的ID
            selectedId: localStorage.getItem("selected-id") || null
        }
    },
    // Vue对象创建完毕后，调用此方法
    created() {
        this.content = localStorage.getItem("content") || 'You can wirte in **Markdown**';
    },
    // 计算属性
    computed: {
        // 笔记预览
        notePreview() {
            return this.selectedNote ? marked(this.selectedNote.content) : "";
        },
        // 为button按钮生成title
        addButtonTitle() {
            return this.notes.length + " node(s) already"
        },
        // 获取选中的笔记
        selectedNote() {
            // 返回与selectedId匹配的笔记
            return this.notes.find(note => note.id === this.selectedId);
        },
        // 笔记排序
        sortedNotes() {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0 : (a.favorite ? -1 : 1));
        },
        linesCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split(/\r\n|\r|\n/).length;
            }

            return 0;
        },
        wordsCount() {
            if (this.selectedNote) {
                let content = this.selectedNote.content;
                // 将换行符转换为空格
                content = content.replace(/\n/g, ' ');
                // 排除开头和结尾的空格
                content = content.replace(/(^\s*)|(\s*$)/gi, '');
                // 将多个重复的空格转换为一个
                content = content.replace(/\s\s+/gi, ' ');
                // 返回字符的数量
                return content.split(' ').length;
            }

            return 0;
        },
        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split("").length;
            }

            return 0;
        }
    },
    // 侦听器
    watch: {
        // 侦听content数据属性
        content: {
            handler(val, oldVal) {
                console.log("new val:", val, "\nold val:", oldVal);
                console.log("saving note:", this.content);
                localStorage.setItem("content", val);
            }
        },
        // 侦听notes
        notes: {
            // 指定触发的方法
            handler: "saveNotes",
            // 表示侦听笔记中每个属性的变化
            deep: true
        },
        // 侦听被选中笔记的ID
        selectedId(val) {
            localStorage.setItem("selected-id", val);
        }
    },
    // 定义方法
    methods: {
        // 新增笔记
        addNote() {
            // 获取当前时间
            let time = Date.now();

            // 新笔记默认值
            let node = {
                id: String(time),
                title: "New note " + (this.notes.length + 1),
                content: "**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!",
                created: time,
                favorite: false,
            };

            // 将新笔记添加到笔记数组中
            this.notes.push(node);
        },
        // 选中笔记
        selectNote(note) {
            this.selectedId = note.id;
        },
        // 存储笔记数组
        saveNotes() {
            // 将笔记数组转换为JSON字符串存储
            localStorage.setItem("notes", JSON.stringify(this.notes));
            console.log("Notes saved!", new Date());
        },
        // 删除笔记
        removeNote() {
            if (this.selectedNote && confirm("Delete the note?")) {
                // 获取要删除笔记的索引值
                let index = this.notes.indexOf(this.selectedNote);

                if (index !== -1) {
                    this.notes.splice(index, 1);
                }
            }
        },
        // 添加/取消笔记收藏
        favoriteNote() {
            if (this.selectedNote) {
                this.selectedNote.favorite ^= true;
            }
        }
    }
});