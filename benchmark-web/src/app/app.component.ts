import {Component} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {ApexAxisChartSeries, ApexNonAxisChartSeries, ApexOptions} from "ng-apexcharts";

interface NavNode {
  name: string;
  children?: NavNode[];
  parent?: NavNode;
}

const cacheKey = 'dummy'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  readonly title = 'benchmark-web';
  readonly nav: { control: NestedTreeControl<NavNode>; dataSource: NavNode[] } = {
    control: new NestedTreeControl<NavNode>((node) => node.children),
    dataSource: [],
  };
  readonly benchmarkByName = new Map<string, any>();
  readonly benchmarkByIdByLibrary = new Map<string, Map<string, any>>();

  benchmarkGroupName: string = 'Database abstractions';
  mode: 'single' | 'summary' | 'none' = 'none';
  single: (Required<ApexOptions> & { chronologicalSeries: ApexAxisChartSeries | ApexNonAxisChartSeries; ascendantSeries: ApexAxisChartSeries | ApexNonAxisChartSeries, statistics: any }) =
    {} as any;
  summary: any = {} as any;

  constructor() {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      this.buildMaps(JSON.parse(cached));
    }
  }


  async onFileInputChange(event: Event) {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) {
      return;
    }

    const contents: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = {
        name: file.name.replace('BenchmarkService.json', ''),
        text: await file.text(),
      }
      contents.push(content);
    }
    localStorage.setItem(cacheKey, JSON.stringify(contents));

    this.buildMaps(contents)
  }

  hasChild = (_: number, node: NavNode) => node.children && node.children.length > 0;

  onNavClick(node: NavNode) {
    if (this.hasChild(0, node)) {
      return;
    }
    if (!node.parent) {
      return;
    }

    this.mode = node.parent.name === 'Aggregated' ? 'summary' : 'single';

    if (this.mode === 'single') {
      const statistics = this.benchmarkByIdByLibrary.get(node.parent.name)!.get(node.name);
      this.single.statistics = statistics;

      this.single.title = { text: 'Chronological' }
      this.single.chart = { height: 350, type: 'bar', toolbar: { show: false } };
      this.single.xaxis = { title: { text: 'Samples' }, labels: { show: false } };
      this.single.yaxis = { title: { text: 'Elapsed milliseconds' }, labels: { show: true, formatter: (val, opts) => val.toFixed(2) } };
      this.single.dataLabels = { enabled: false, };
      this.single.legend = { show: true };

      this.single.chronologicalSeries = [ { name: 'Milliseconds', data: statistics.samples } ];
      this.single.ascendantSeries = [ { name: 'Milliseconds', data: [...statistics.samples].sort((f, s) => f - s) } ];
      return;
    }

    if (this.mode === 'summary') {
      if (node.name === 'Overall') {
        const totalElapsedTimes: any[] = [];
        let minimum: any;
        let maximum: any;
        for (const [library, benchmarkById] of this.benchmarkByIdByLibrary) {
          let totalElapsed = 0;
          for (const statistic of benchmarkById.values()) {
            totalElapsed += statistic.accumulated;
          }
          const aggregated = { library, totalElapsed };
          totalElapsedTimes.push(aggregated);
          if (!minimum || minimum.totalElapsed > aggregated.totalElapsed) {
            minimum = aggregated;
          }
          if (!maximum || maximum.totalElapsed < aggregated.totalElapsed) {
            maximum = aggregated;
          }
        }

        this.summary.minimum = minimum;
        this.summary.maximum = maximum;
        this.summary.statistics = totalElapsedTimes;

      } else {
        const totalElapsedTimes: any[] = [];
        let minimum: any;
        let maximum: any;
        for (const [library, benchmarkById] of this.benchmarkByIdByLibrary) {
          let totalElapsed = 0;
          for (const statistic of benchmarkById.values()) {
            if (statistic.name === node.name) {
              totalElapsed += statistic.accumulated;
            }
          }
          const aggregated = { library, totalElapsed };
          totalElapsedTimes.push(aggregated);
          if (!minimum || minimum.totalElapsed > aggregated.totalElapsed) {
            minimum = aggregated;
          }
          if (!maximum || maximum.totalElapsed < aggregated.totalElapsed) {
            maximum = aggregated;
          }
        }

        this.summary.minimum = minimum;
        this.summary.maximum = maximum;
        this.summary.statistics = totalElapsedTimes;
      }

      this.summary.title = { text: 'Total benchmark time' }
      this.summary.chart = { height: 350, type: 'bar', toolbar: { show: false } };
      this.summary.xaxis = { title: { text: 'Libraries' }, labels: { show: true } };
      this.summary.yaxis = { title: { text: 'Execution time (min)' }, labels: { show: true, formatter: (val: any, opts: any) => val.toFixed(2) } };
      this.summary.dataLabels = { enabled: false, };
      this.summary.legend = { show: true };
      this.summary.series = [ { name: 'Minutes', data: this.summary.statistics.map((u: any) => ({ x: u.library, y: u.totalElapsed / (60 * 1000)})) } ];

      this.summary.percents = this.summary.statistics.map((u: any) => {
        const percent = 100 * (u.totalElapsed / this.summary.maximum.totalElapsed);
        return {
          library: u.library,
          percent: percent,
        };
      });

      return;
    }
  }

  num(val: number) {
    return val.toFixed(2);
  }

  private buildNav() {
    const navName = this.benchmarkGroupName;
    const navTree: NavNode = {
      name: navName,
      children: [],
    };

    const aggregatedLabels: string[] = ['Overall'];

    for (const [name, benchmark] of this.benchmarkByName.entries()) {
      const childNode: NavNode = {
        name: name,
        parent: navTree,
        children: [],
      };

      childNode.children = benchmark.statistics.map((statistic: any) => {
        if (!aggregatedLabels.includes(statistic.name)) {
          aggregatedLabels.push(statistic.name);
        }
        return {
          name: statistic.name,
          parent: childNode,
        }
      });

      navTree.children!.push(childNode);
    }

    const aggregatedNode: NavNode = {
      name: 'Aggregated',
      parent: navTree,
      children: [],
    };
    navTree.children!.unshift(aggregatedNode);
    for (const aggregatedLabel of aggregatedLabels) {
      aggregatedNode.children!.push({
        name: aggregatedLabel,
        parent: aggregatedNode,
      });
    }

    this.nav.dataSource = [navTree];
  }

  private buildMaps(contents: any[]) {
    for (const content of contents) {
      if (!this.benchmarkByIdByLibrary.has(content.name)) {
        this.benchmarkByIdByLibrary.set(content.name, new Map());
      }

      const statistics = JSON.parse(content.text);
      for (const statistic of statistics) {
        statistic.name = statistic.name.split('::')[1];

        this.benchmarkByIdByLibrary.get(content.name)!.set(statistic.name, statistic);
      }
      const benchmark = {
        name: content.name,
        statistics,
      };
      this.benchmarkByName.set(benchmark.name, benchmark);
    }

    this.buildNav();
  }
}
