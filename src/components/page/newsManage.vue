<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i>&nbsp;新闻管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="addNews">添加新闻</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="newsData" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="标题" width="120">
            </el-table-column>
            <el-table-column prop="address" label="内容" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加新闻" :visible.sync="outerVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="新闻名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动区域">-->
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="新闻日期">
                    <el-col :span="6">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1"><p style="text-align: center">-</p></el-col>
                    <el-col :span="6">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                        style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否置顶">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <!--<el-form-item label="活动性质">-->
                <!--<el-checkbox-group v-model="form.type">-->
                <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
                <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
                <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
                <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
                <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="特殊资源">-->
                <!--<el-radio-group v-model="form.resource">-->
                <!--<el-radio label="线上品牌商赞助"></el-radio>-->
                <!--<el-radio label="线下场地免费"></el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <el-form-item label="新闻简介">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload
                        action="http://127.0.0.1"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">保存</el-button>
            </div>
        </el-dialog>

        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                outerVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                value1: ''
            }
        },
        created() {
            this.getData();
        },
        computed: {
            newsData() {
                const self = this;
                return self.tableData.filter(function (d) {
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if (d.name === self.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                                d.address.indexOf(self.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit() {
                console.log('submit!');
            },
            addNews() {
                this.outerVisible = true
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = '/ms/table/list';
                }
                ;
                self.$axios.post(self.url, {page: self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.outerVisible = true
            },
            handleDelete(index, row) {
                // this.$message.error('删除第' + (index + 1) + '行');
            },
            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除成功');
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
