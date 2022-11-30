<template>
  <div class="">
      <ul v-if="pages" class="list-reset">
          <li class="inline-block bg-[#FF6C5E] rounded-full mr-4">
              <a href="#"
                 class=" text-white flex place-items-center place-content-center w-[35px] h-[35px]"
                 :class="{' cursor-not-allowed': currentPage == 1}"
                 @click.prevent="getPreviousPage">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg> 
              </a>
          </li>
          <li v-for="(page, index) in range"
              :key="index"
              class="inline-block"
              :class="{' ': index == range.length -1}"
          >
              <a v-if="page != '...'"
                 href="#"
                 class="rounded-full text-grey-darker flex place-items-center place-content-center w-[35px] h-[35px]"
                 :class="{'bg-[#FF6C5E] text-white' : page == currentPage}"
                 @click.prevent="getPage(page)">
                  {{page}}
              </a>
              <a v-else href="#" class="no-underline text-grey-darker block py-3 px-4">
                  {{page}}
              </a>
          </li>
          <li class="inline-block bg-[#FF6C5E] rounded-full ml-4">
              <a href="#"
                 class="text-white flex place-items-center place-content-center w-[35px] h-[35px]"
                 :class="{' cursor-not-allowed': currentPage >= pages}"
                 @click.prevent="getNextPage">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </a>
          </li>
      </ul>
  </div>
</template>

<script>
  export default {
      name: 'Pagination',
      props: {
          pages: {
              type: Number,
              default: 0
          },
          currentPage: {
              type: Number,
              default: 1
          }
      },
      data() {
          return {
              range: []
          }
      },
      computed: {
          propsToWatch() {
              return this.pages, this.currentPage, Date.now()
          }
      },
      watch: {
          propsToWatch: {
              handler: 'organisePageLinks',
              immediate: true
          }
      },
      methods: {
          organisePageLinks() {
              this.range = []
              for (let i = 1; i <= this.pages; i++) {
                  if (
                      i == 1 || // first page
                      i == this.pages || // last page
                      i == this.currentPage || // current page
                      i == this.currentPage - 1 || // page before current
                      i == this.currentPage + 1 || // page after current
                      (i <= 7 && this.currentPage < 4) || // "filler" links at start
                      (i >= this.pages - 3 && this.currentPage > this.pages - 3) // "filler" links at end
                  ) {
                      let index = this.range.length
                      if (index > 0 && this.range[index - 1] < i - 1) {
                          // if this page is not the next one insequence, add in 3 dots "..."
                          this.range.push('...')
                      }
                      this.range.push(i)
                  }
              }
          },
          getPage(page) {
              this.$emit('page-changed', page)
          },
          getPreviousPage() {
              this.getPage(this.currentPage - 1)
          },
          getNextPage() {
              this.getPage(this.currentPage + 1)
          }
      }
  }
</script>